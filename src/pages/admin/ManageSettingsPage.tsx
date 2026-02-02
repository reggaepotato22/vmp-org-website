import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSettings, SiteSettings } from '@/context/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

const ManageSettingsPage = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<SiteSettings>({
    defaultValues: settings
  });

  // Reset form when settings are loaded
  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const onSubmit = async (data: SiteSettings) => {
    try {
      await updateSettings(data);
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Global Settings</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* General Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic information about your organization that appears across the site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Site Title</label>
                <Input {...register("siteTitle")} placeholder="Veterinarians With a Mission Programme" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input {...register("contactEmail")} placeholder="info@kenyavetsmission.org" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input {...register("phone")} placeholder="0116-922-908" />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Physical Address</label>
                <Input {...register("address")} placeholder="Ultimate House, Oloolua Road, Ngong Town" />
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Links to your social media profiles. Leave empty to hide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Twitter / X</label>
                <Input {...register("socialLinks.twitter")} placeholder="https://twitter.com/..." />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Facebook</label>
                <Input {...register("socialLinks.facebook")} placeholder="https://facebook.com/..." />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Instagram</label>
                <Input {...register("socialLinks.instagram")} placeholder="https://instagram.com/..." />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageSettingsPage;
