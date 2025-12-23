import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Image, Upload, X } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface SiteImage {
  name: string;
  url: string;
}

interface ImagesManagerProps {
  session: Session | null;
}

const ImagesManager = ({ session }: ImagesManagerProps) => {
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const { data, error } = await supabase.storage.from('site-images').list('', { limit: 100 });
      if (error) throw error;
      
      const images = await Promise.all(
        (data || []).filter(item => !item.id.endsWith('/')).map(async (item) => {
          const { data: { publicUrl } } = supabase.storage.from('site-images').getPublicUrl(item.name);
          return { name: item.name, url: publicUrl };
        })
      );
      setSiteImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    setLoadingImages(false);
  };

  useEffect(() => {
    if (session) {
      fetchImages();
    }
  }, [session]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image_type', 'site');

      const { data, error } = await supabase.functions.invoke('upload-image', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      fetchImages();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setUploadingImage(false);
  };

  const handleDeleteImage = async (imageName: string) => {
    try {
      const { error } = await supabase.storage.from('site-images').remove([imageName]);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
      fetchImages();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Image Management</CardTitle>
              <CardDescription>Upload and manage site images</CardDescription>
            </div>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
            <Button asChild disabled={uploadingImage}>
              <span>
                {uploadingImage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </>
                )}
              </span>
            </Button>
          </label>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loadingImages ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : siteImages.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No images uploaded yet</p>
            <p className="text-sm text-muted-foreground mt-2">Upload your first image using the button above</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {siteImages.map((image) => (
              <div key={image.name} className="relative group rounded-xl overflow-hidden border border-border bg-muted/30">
                <img 
                  src={image.url} 
                  alt={image.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigator.clipboard.writeText(image.url).then(() => toast({ title: "Copied", description: "Image URL copied to clipboard" }))}
                  >
                    Copy URL
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteImage(image.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImagesManager;
