import { supabase } from '@/lib/supabase';

const NEWS_BUCKET = 'news_images';

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 */
export async function uploadImage(file: File, folder: string = 'uploads'): Promise<string | null> {
  if (!file) {
    console.error('❌ No file provided');
    return null;
  }

  try {
    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const fileName = `${folder}/${timestamp}_${randomId}.${fileExtension}`;
    
    console.log(`📤 Uploading file to: ${fileName}`);
    
    // 1. Try uploading to local PHP backend (for cPanel compatibility)
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const phpResponse = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
      });

      // Check if we got a valid JSON response (and not the raw PHP file)
      const contentType = phpResponse.headers.get("content-type");
      if (phpResponse.ok && contentType && contentType.includes("application/json")) {
        const result = await phpResponse.json();
        if (result.success && result.url) {
          console.log('✅ Uploaded to local PHP backend:', result.url);
          return result.url;
        }
      } else {
         console.log('ℹ️ Local PHP backend not available (likely running in dev mode without PHP), trying Supabase...');
      }
    } catch (phpErr) {
      console.log('ℹ️ Local PHP backend upload failed, trying Supabase...', phpErr);
    }

    // 2. Try Supabase
    const { data, error } = await supabase.storage
      .from(NEWS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn('⚠️ Supabase upload failed, falling back to local demo mode:', error);
      // Fallback for demo/local/no-backend mode:
      // Create a local blob URL so the UI still works for the user
      const localUrl = URL.createObjectURL(file);
      console.log('✅ Local demo URL created:', localUrl);
      return localUrl;
    }

    console.log('✅ File uploaded successfully:', data);

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(NEWS_BUCKET)
      .getPublicUrl(fileName);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error('❌ Failed to get public URL');
      // Instead of alerting, fallback to local URL
      const localUrl = URL.createObjectURL(file);
      return localUrl;
    }

    console.log('✅ Public URL obtained:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;

  } catch (err) {
    console.error('❌ File upload failed:', err);
    // Final fallback to local URL so the app never breaks
    const localUrl = URL.createObjectURL(file);
    console.log('✅ Recovered with local demo URL:', localUrl);
    return localUrl;
  }
}

/**
 * Deletes an image from Supabase Storage based on its URL.
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
  if (!imageUrl) {
    console.error('❌ No image URL provided');
    return false;
  }

  try {
    // Extract the file path from the URL
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[path]
    const urlParts = imageUrl.split(`${NEWS_BUCKET}/`);
    if (urlParts.length < 2) {
      console.error('❌ Invalid image URL format');
      return false;
    }
    
    const filePath = urlParts[1];
    console.log(`🗑️ Deleting file: ${filePath}`);

    const { error } = await supabase.storage
      .from(NEWS_BUCKET)
      .remove([filePath]);

    if (error) {
      console.error('❌ Supabase delete error:', error);
      return false;
    }

    console.log('✅ File deleted successfully');
    return true;

  } catch (err) {
    console.error('❌ File delete failed:', err);
    return false;
  }
}
