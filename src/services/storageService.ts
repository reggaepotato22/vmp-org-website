import { api } from '@/lib/api';

export const uploadImage = async (file: File, bucket: string = 'general'): Promise<string> => {
  // We ignore bucket for now as we have a single upload endpoint
  // But we could pass it as query param if needed.
  // API returns relative path. We want full URL for frontend display usually, 
  // or relative if we use <img src="/uploads/..." /> (which works if frontend and backend on same domain).
  // But dev is separate.
  // api.upload returns relative path e.g. /uploads/foo.jpg
  // api.getImageUrl converts it to full URL.
  const path = await api.upload(file);
  return api.getImageUrl(path);
};

export const deleteImage = async (path: string) => {
  // Implementation depends on if we have a delete endpoint.
  // For now, we can just return success, as deleting file on server when record is deleted is optional but good.
  // We haven't implemented DELETE /api/upload yet.
  console.warn('Delete image not implemented in API yet');
  return true;
};
