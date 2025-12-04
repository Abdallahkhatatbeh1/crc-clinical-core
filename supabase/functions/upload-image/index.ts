import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the user is an admin
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.log('User verification failed:', userError);
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (roleError || !roleData) {
      console.log('User is not an admin:', roleError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const contentId = formData.get('content_id') as string;
    const imageType = formData.get('image_type') as string || 'general';

    if (!file) {
      console.log('No file provided');
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${imageType}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.log('Upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: uploadError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('File uploaded successfully:', uploadData.path);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(uploadData.path);

    console.log('Public URL:', publicUrl);

    // If content_id is provided, update the site_content record
    if (contentId) {
      const { error: updateError } = await supabase
        .from('site_content')
        .update({ image_url: publicUrl })
        .eq('id', contentId);

      if (updateError) {
        console.log('Failed to update content:', updateError);
      } else {
        console.log('Content updated with image URL');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: publicUrl,
        path: uploadData.path 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Unexpected error:', errorMessage);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});