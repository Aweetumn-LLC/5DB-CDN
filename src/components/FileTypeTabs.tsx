import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileImage, FileVideo, Image, FileText, ExternalLink } from "lucide-react";
export type FileType = 'all' | 'images' | 'gifs' | 'videos' | 'tickets' | 'documents' | 'links';

interface FileTypeTabsProps {
  fileType: FileType;
  onFileTypeChange: (fileType: FileType) => void;
}

const FileTypeTabs = ({ fileType, onFileTypeChange }: FileTypeTabsProps) => {
  return (
    <Tabs value={fileType} onValueChange={(value) => onFileTypeChange(value as FileType)} className="w-full max-w-2xl mx-auto">
      <TabsList className="grid w-full grid-cols-7 elegant-card h-12 p-1">
        <TabsTrigger value="all" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FileImage className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">All</span>
        </TabsTrigger>
        <TabsTrigger value="images" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Image className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Images</span>
        </TabsTrigger>
        <TabsTrigger value="gifs" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FileImage className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">GIFs</span>
        </TabsTrigger>
        <TabsTrigger value="videos" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FileVideo className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Videos</span>
        </TabsTrigger>
        <TabsTrigger value="tickets" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Tickets</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Documents</span>
        </TabsTrigger>
        <TabsTrigger value="links" className="flex items-center gap-2 elegant-button rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Links</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default FileTypeTabs;