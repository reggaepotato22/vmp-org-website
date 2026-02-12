import React, { useRef, useState } from 'react';
import mammoth from 'mammoth';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DocxImporterProps {
  onImport: (html: string) => void;
  label?: string;
}

const DocxImporter: React.FC<DocxImporterProps> = ({ onImport, label = "Import from DOCX" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      if (result.value) {
        onImport(result.value);
        toast.success("DOCX imported successfully!");
      } else {
        toast.warning("No content found in DOCX");
      }
    } catch (error) {
      console.error("DOCX Import Error:", error);
      toast.error("Failed to parse DOCX file");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".docx" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
        {label}
      </Button>
    </div>
  );
};

export default DocxImporter;
