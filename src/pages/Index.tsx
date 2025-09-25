import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CDNSearch from "@/components/CDNSearch";
import CDNGrid from "@/components/CDNGrid";
import FileTypeTabs, { FileType } from "@/components/FileTypeTabs";
import AuthButton from "@/components/AuthButton";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, HardDrive, Image } from "lucide-react";
import { useCDNStats } from "@/hooks/useCDNStats";

const Index = () => {
  const [q, setQ] = useState("");
  const [fileType, setFileType] = useState<FileType>("all");
  const navigate = useNavigate();
  const { totalImages, totalStorageMB, loading } = useCDNStats();

  useEffect(() => {
    document.title = "FiveM Database CDN – Fast static image CDN";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/30 elegant-card">
        <div className="container py-16">
          {/* Main header layout */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="elegant-card px-8 py-4 rounded-2xl">
                <h1 className="text-6xl sm:text-7xl font-black tracking-tight text-gradient mb-2">
                  FiveM Database CDN
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                 Content Delivery Network
                </p>
              </div>
            </div>
            
            {/* Stats row */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="elegant-card px-6 py-3 rounded-xl">
                <div className="flex items-center gap-3 text-sm">
                  <Image className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">
                    {loading ? "..." : totalImages.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">Assets</span>
                </div>
              </div>
              <div className="elegant-card px-6 py-3 rounded-xl">
                <div className="flex items-center gap-3 text-sm">
                  <HardDrive className="h-5 w-5 text-primary" />
                  <span className="font-bold text-lg">
                    {loading ? "..." : `${totalStorageMB} MB`}
                  </span>
                  <span className="text-muted-foreground">Storage</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Premium static content delivery with lightning-fast performance. 
              <br />
              <span className="text-primary font-semibold">Browse, preview, and deploy instantly.</span>
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="elegant-button">
                  Legal & Policies
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="elegant-card">
                <DropdownMenuItem onClick={() => navigate("/legal")}>Legal</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/usage-policy")}>Usage Policy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/data-usage")}>Data Usage</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/removal-of-data")}>Removal of Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/showcase")}
              className="elegant-button"
            >
              Showcase
            </Button>
            
            <AuthButton />
          </div>

          {/* Search and filters */}
          <div className="space-y-6">
            <CDNSearch value={q} onChange={setQ} />
            <FileTypeTabs fileType={fileType} onFileTypeChange={setFileType} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <CDNGrid query={q} fileType={fileType} />
      </main>

      <footer className="border-t border-border/30 elegant-card mt-auto">
        <div className="container py-8 text-center">
          <div className="elegant-card inline-block px-8 py-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} FiveM Database CDN - Content Delivery
            </p>
            <p className="text-xs text-muted-foreground/70">
              Powering the world's most demanding applications
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
