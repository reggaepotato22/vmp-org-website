import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSettings, SiteSettings } from '@/context/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

import { Switch } from '@/components/ui/switch';

const ManageSettingsPage = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<SiteSettings>({
    defaultValues: settings
  });

  // Watch features to update UI immediately
  const features = watch("features");

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
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Global Settings</h2>
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
                <label className="text-sm font-medium dark:text-slate-200">Site Title</label>
                <Input {...register("siteTitle")} placeholder="Veterinarians With a Mission Programme" />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-slate-200">Mission Statement</label>
                <textarea 
                  {...register("missionStatement")} 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="We are dedicated to..." 
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium dark:text-slate-200">Contact Email</label>
                  <Input {...register("contactEmail")} placeholder="info@kenyavetsmission.org" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium dark:text-slate-200">Phone Number</label>
                  <Input {...register("phone")} placeholder="0116-922-908" />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium dark:text-slate-200">Physical Address</label>
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

          {/* Homepage Sections */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Homepage Sections</CardTitle>
              <CardDescription>
                Toggle the visibility of different sections on the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium dark:text-slate-200">Donations Section</label>
                  <p className="text-sm text-muted-foreground">
                    Show the "Every Gift Creates a Brighter Tomorrow" section.
                  </p>
                </div>
                <Switch
                  checked={watch("features.showDonations")}
                  onCheckedChange={(checked) => setValue("features.showDonations", checked, { shouldDirty: true })}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium dark:text-slate-200">Missions/Impact Section</label>
                  <p className="text-sm text-muted-foreground">
                    Show the impact statistics and missions highlights.
                  </p>
                </div>
                <Switch
                  checked={watch("features.showMissions")}
                  onCheckedChange={(checked) => setValue("features.showMissions", checked, { shouldDirty: true })}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium dark:text-slate-200">Projects Section</label>
                  <p className="text-sm text-muted-foreground">
                    Show the "Our Work" / Projects grid section.
                  </p>
                </div>
                <Switch
                  checked={watch("features.showProjects")}
                  onCheckedChange={(checked) => setValue("features.showProjects", checked, { shouldDirty: true })}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium">Gallery Section</label>
                  <p className="text-sm text-muted-foreground">
                    Show the "Moments That Inspire Change" image gallery.
                  </p>
                </div>
                <Switch
                  checked={watch("features.showGallery")}
                  onCheckedChange={(checked) => setValue("features.showGallery", checked, { shouldDirty: true })}
                />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium">Testimonials Section</label>
                  <p className="text-sm text-muted-foreground">
                    Show the "Stories That Inspire Change" testimonials.
                  </p>
                </div>
                <Switch
                  checked={watch("features.showTestimonials")}
                  onCheckedChange={(checked) => setValue("features.showTestimonials", checked, { shouldDirty: true })}
                />
              </div>
               <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium">Latest News Section</label>
                  <p className="text-sm text-muted-foreground">
                    Show the latest news and updates.
                  </p>
                </div>
                <Switch
                  checked={watch("features.showNews")}
                  onCheckedChange={(checked) => setValue("features.showNews", checked, { shouldDirty: true })}
                />
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
