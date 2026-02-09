import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm mb-4">
        <Icon className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">{description}</p>
      <Button onClick={onAction} className="bg-primary hover:bg-primary/90 text-white">
        <Plus className="mr-2 h-4 w-4" />
        {actionLabel}
      </Button>
    </div>
  );
};

export default EmptyState;
