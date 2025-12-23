import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploaderProps {
  imageId: string;
  imageName: string;
  currentUrl: string | null;
  fallbackUrl: string;
  onImageUpdated: () => void;
}

const ImageUploader = ({ imageId, imageName, currentUrl, fallbackUrl, onImageUpdated }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const displayUrl = currentUrl || fallbackUrl;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${imageName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(fileName);

      // Update database with new image URL
      const { error: updateError } = await supabase
        .from('site_content')
        .update({ image_url: publicUrl, updated_at: new Date().toISOString() })
        .eq('id', imageId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: `${imageName} updated successfully`,
      });
      
      setPreviewUrl(null);
      onImageUpdated();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      setPreviewUrl(null);
    }
    setUploading(false);
  };

  const handleRemoveCustomImage = async () => {
    try {
      const { error } = await supabase
        .from('site_content')
        .update({ image_url: null, updated_at: new Date().toISOString() })
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Reverted to default image",
      });
      onImageUpdated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove custom image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="group relative rounded-lg overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-all">
      <div className="aspect-square relative">
        <img 
          src={previewUrl || displayUrl} 
          alt={imageName}
          className="w-full h-full object-cover"
        />
        
        {/* Custom image indicator */}
        {currentUrl && (
          <div className="absolute top-2 right-2 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Check className="h-3 w-3" />
            Custom
          </div>
        )}

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
          <label className="cursor-pointer w-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading}
            />
            <Button 
              asChild 
              size="sm" 
              className="w-full" 
              disabled={uploading}
            >
              <span>
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1.5"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3 mr-1.5" />
                    Replace
                  </>
                )}
              </span>
            </Button>
          </label>
          
          {currentUrl && (
            <Button 
              size="sm" 
              variant="secondary"
              className="w-full"
              onClick={handleRemoveCustomImage}
            >
              <X className="h-3 w-3 mr-1.5" />
              Use Default
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-2 bg-white">
        <p className="text-xs font-medium text-foreground truncate">{imageName}</p>
        <p className="text-[10px] text-muted-foreground">
          {currentUrl ? "Custom image" : "Default image"}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
