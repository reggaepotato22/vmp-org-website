import { createClient } from '@supabase/supabase-js';

// ==============================================================================
// 🌟 FIX APPLIED: SUPABASE CREDENTIALS CONFIGURED 🌟
// ==============================================================================

const SUPABASE_URL = "https://jtgncyjqywuvppfkzrzq.supabase.co"; // YOUR PROJECT URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Z25jeXpxeXd1dnBwZmt6cnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTM2MzksImV4cCI6MjA4MDg2OTYzOX0.vGjLNEu4LVVSv9vCslzaWCXX1XimAPJA3yTJjxv3hRs"; // YOUR PUBLIC ANON KEY
const NEWS_BUCKET = 'news_images'; 

// Check if credentials are configured (This check should now pass)
const isConfigured = !SUPABASE_URL.includes("your-supabase-url") && 
                     !SUPABASE_ANON_KEY.includes("your-anon-key");

if (!isConfigured) {
  console.error('❌ Supabase credentials are not configured. Image uploads will fail.'); 
  window.alert('Image upload is not configured. Please set up Supabase credentials in storageService.js');
}

// Initialize Supabase client
let supabase = null;
if (isConfigured) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    supabase = null;
}

/**
 * Uploads a file to Supabase Storage and returns the public URL.
 */
export async function uploadImage(file, folder = 'uploads') {
  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase not configured in uploadImage');
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
 */
export async function deleteImage(imageUrl) {
  // Check if Supabase is configured
  if (!supabase) {
    console.error('❌ Supabase not configured in deleteImage');
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