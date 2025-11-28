import { createClient } from '@supabase/supabase-js';

// ==============================================================================
// SUPABASE CONFIGURATION
// ==============================================================================
// ⚠️ IMPORTANT: Replace these with your actual Supabase credentials
// Get them from: https://app.supabase.com/project/_/settings/api
// ==============================================================================

const SUPABASE_URL = "https://your-supabase-url.supabase.co"; // Replace with your project URL
const SUPABASE_ANON_KEY = "your-anon-key-here"; // Replace with your anon/public key
const NEWS_BUCKET = 'news_images'; // Your storage bucket name

// Check if credentials are configured
const isConfigured = !SUPABASE_URL.includes("your-supabase-url") && 
                     !SUPABASE_ANON_KEY.includes("your-anon-key");

if (!isConfigured) {
  console.warn('⚠️ Supabase credentials are not configured. Image uploads will not work.');
  console.warn('📋 Configure your credentials in src/services/storageService.js');
}

// Initialize Supabase client
let supabase = null;
if (isConfigured) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 * @param {File} file - The image file to upload.
 * @param {string} folder - The sub-folder inside the bucket (e.g., 'featured' or 'recent_news').
 * @returns {Promise<string|null>} The public URL of the uploaded image or null if failed.
 */
export async function uploadImage(file, folder = 'uploads') {
  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase not configured');
    alert('Image upload is not configured. Please set up Supabase credentials in storageService.js');
    return null;
  }

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
    
    // Upload the file to the specified bucket and path
    const { data, error } = await supabase.storage
      .from(NEWS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Supabase upload error:', error);
      alert(`Upload failed: ${error.message}`);
      return null;
    }

    console.log('✅ File uploaded successfully:', data);

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(NEWS_BUCKET)
      .getPublicUrl(fileName);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error('❌ Failed to get public URL');
      alert('Failed to get image URL');
      return null;
    }

    console.log('✅ Public URL obtained:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;

  } catch (err) {
    console.error('❌ File upload failed:', err);
    alert('File upload failed. Check console for details.');
    return null;
  }
}

/**
 * Deletes an image from Supabase Storage based on its URL.
 * @param {string} imageUrl - The public URL of the image.
 * @returns {Promise<boolean>} Success status.
 */
export async function deleteImage(imageUrl) {
  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase not configured');
    return false;
  }

  if (!imageUrl) {
    console.error('❌ No image URL provided');
    return false;
  }

  try {
    // Extract the path from the URL by splitting after the bucket name
    const urlParts = imageUrl.split(`${NEWS_BUCKET}/`);
    
    // If the URL is not a standard Supabase public URL, skip deletion
    if (urlParts.length < 2) {
      console.warn("⚠️ URL doesn't match expected Supabase format, skipping deletion.");
      return true; 
    }

    const pathInBucket = urlParts[1];
    console.log(`🗑️ Deleting file: ${pathInBucket}`);

    const { error } = await supabase.storage
      .from(NEWS_BUCKET)
      .remove([pathInBucket]);

    if (error) {
      console.error('❌ Supabase deletion error:', error);
      alert(`Delete failed: ${error.message}`);
      return false;
    }
    
    console.log('✅ File deleted successfully');
    return true;
  } catch (err) {
    console.error('❌ File deletion failed:', err);
    return false;
  }
}

// ==============================================================================
// SETUP INSTRUCTIONS
// ==============================================================================
/*

📋 QUICK SETUP GUIDE:

1. INSTALL DEPENDENCIES:
   npm install @supabase/supabase-js

2. CREATE SUPABASE PROJECT:
   - Go to https://supabase.com
   - Click "New Project"
   - Note your project URL and anon key

3. CREATE STORAGE BUCKET:
   - In Supabase Dashboard: Storage → New Bucket
   - Name it: "news_images" (or update NEWS_BUCKET constant above)
   - Make it PUBLIC for direct image access

4. SET STORAGE POLICIES:
   Go to Storage → Policies → Create Policy
   
   Policy 1 - Allow Public Uploads (for testing):
   ```sql
   CREATE POLICY "Public Upload" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'news_images');
   ```
   
   Policy 2 - Allow Public Reads:
   ```sql
   CREATE POLICY "Public Read" ON storage.objects
   FOR SELECT USING (bucket_id = 'news_images');
   ```
   
   Policy 3 - Allow Public Deletes (for testing):
   ```sql
   CREATE POLICY "Public Delete" ON storage.objects
   FOR DELETE USING (bucket_id = 'news_images');
   ```

5. CONFIGURE CREDENTIALS:
   - Replace SUPABASE_URL with your project URL
   - Replace SUPABASE_ANON_KEY with your anon key
   - Save this file

6. TEST:
   - Try uploading an image in the admin dashboard
   - Check Supabase Storage to verify upload
   - Check browser console for logs

⚠️ PRODUCTION NOTES:
   - Implement proper authentication
   - Restrict storage policies to authenticated users
   - Add file size limits (max 10MB recommended)
   - Validate file types server-side
   - Consider using environment variables for credentials

*/