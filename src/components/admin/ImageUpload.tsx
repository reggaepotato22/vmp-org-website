import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Upload, X, Loader2, Trash2 } from "lucide-react";
import { uploadImage } from "@/services/storageService";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  folder?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  multiple = false,
  label = "Cover Image",
  folder = "uploads",
  className
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Normalize value to array for consistent handling
  const urls = Array.isArray(value) ? value : (value ? [value] : []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      // Upload all selected files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadImage(file, folder);
        if (url) {
          newUrls.push(url);
        }
      }

      if (multiple) {
        onChange([...urls, ...newUrls]);
      } else {
        // If single mode, just take the first new URL (or the last one uploaded)
        if (newUrls.length > 0) {
          onChange(newUrls[0]);
        }
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (multiple) {
      onChange(urls.filter(url => url !== urlToRemove));
    } else {
      onChange("");
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-base font-semibold text-slate-900 dark:text-slate-100">{label}</Label>
      
      {/* Preview Grid */}
      {urls.length > 0 ? (
        <div className={cn("grid gap-4", multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1")}>
          {urls.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <img 
                src={url} 
                alt="Uploaded image" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  onClick={() => handleRemove(url)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div 
          onClick={triggerUpload}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors h-48"
        >
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md mb-4">
            <ImageIcon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Click to upload {multiple ? "images" : "an image"}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            SVG, PNG, JPG or GIF (max. 5MB)
          </p>
        </div>
      )}

      {/* Hidden Input & Additional Upload Button if multiple */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple={multiple}
      />

      {(multiple && urls.length > 0) && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={triggerUpload}
          disabled={isUploading}
          className="w-full border-dashed"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Add More Images
            </>
          )}
        </Button>
      )}

      {/* Loading State for Single Upload Replacement */}
      {(!multiple && urls.length > 0) && (
        <div className="flex justify-end">
           <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={triggerUpload}
            disabled={isUploading}
            className="text-xs text-slate-500 hover:text-primary"
          >
            Change Image
          </Button>
        </div>
      )}
    </div>
  );
};
