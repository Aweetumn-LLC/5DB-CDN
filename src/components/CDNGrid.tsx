import { useMemo, useState, useEffect } from "react";
import { cdnImages, type CDNImage } from "@/data/cdnImages";
import { useUserUploads } from "@/hooks/useUserUploads";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LazyImage from "@/components/LazyImage";
import LazyVideo from "@/components/LazyVideo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, ExternalLink, Maximize2 } from "lucide-react";

export type FileType = 'all' | 'images' | 'gifs' | 'videos' | 'tickets' | 'documents' | 'links';

interface CDNGridProps {
  query: string;
  fileType: FileType;
}

const getAbsoluteUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `${window.location.origin}${path}`;
};

const getFileType = (filename: string): FileType => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return 'images';
  
  if (['gif'].includes(ext)) return 'gifs';
  if (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(ext)) return 'videos';
  if (['html', 'htm'].includes(ext)) return 'tickets';
  if (['pdf'].includes(ext)) return 'documents';
  if (['json'].includes(ext)) return 'links';
  return 'images';
};

const matches = (item: CDNImage, q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const haystack = [
    item.title,
    item.filename,
    ...(item.tags ?? []),
    item.alt ?? "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(s);
};

const matchesFileType = (item: CDNImage, fileType: FileType) => {
  if (fileType === 'all') return true;
  // Check if item is a link type
  if ((item as any).isLink) return fileType === 'links';
  return getFileType(item.filename) === fileType;
};

const CDNGrid = ({ query, fileType }: CDNGridProps) => {
  const { userUploads, loading } = useUserUploads();
  
  // Links from JSON file
  const [links, setLinks] = useState<Array<{link: string, name: string}>>([]);
  
  useEffect(() => {
    if (fileType === 'links' || fileType === 'all') {
      fetch('/links.json')
        .then(response => response.json())
        .then(data => setLinks(data))
        .catch(error => console.error('Error loading links:', error));
    }
  }, [fileType]);
  
  // Static HTML files from public directory
  const htmlFiles = useMemo(() => [
    {
      filename: '/qs-5db.html',
      title: 'QS-5DB Ticket',
      width: 800,
      height: 600,
      alt: 'QS-5DB HTML ticket viewer',
      tags: ['ticket', 'html', 'qs-5db']
    },
    {
      filename: '/qs-warden.html', 
      title: 'QS-Warden Ticket',
      width: 800,
      height: 600,
      alt: 'QS-Warden HTML ticket viewer',
      tags: ['ticket', 'html', 'qs-warden']
    }
  ], []);
  
  // Static PDF files from public directory
  const pdfFiles = useMemo(() => {
    const pdfGlob = import.meta.glob("../../public/**/*.pdf", {
      as: "url",
      eager: true,
    }) as Record<string, string>;
    
    return Object.keys(pdfGlob).map((fsPath) => {
      const filename = fsPath.replace(/.*\/public/, "");
      const title = filename.split("/").pop()?.replace(/\.pdf$/i, "").replace(/[\-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) || filename;
      return {
        filename,
        title,
        width: 800,
        height: 600,
        alt: `${title} PDF document`,
        tags: ['document', 'pdf', ...filename.split("/").filter(p => p && p !== "cdn")]
      };
    });
  }, []);
  
  const items = useMemo(() => {
    let allItems = [...cdnImages, ...userUploads];
    
    // Add HTML files when viewing tickets
    if (fileType === 'tickets' || fileType === 'all') {
      allItems = [...allItems, ...htmlFiles];
    }
    
    // Add PDF files when viewing documents
    if (fileType === 'documents' || fileType === 'all') {
      allItems = [...allItems, ...pdfFiles];
    }
    
    // Add links when viewing links
    if (fileType === 'links' || fileType === 'all') {
      const linkItems = links.map((link, index) => ({
        filename: link.link,
        title: link.name,
        width: 400,
        height: 200,
        alt: `Link to ${link.name}`,
        tags: ['link', 'external'],
        isLink: true
      }));
      allItems = [...allItems, ...linkItems];
    }
    
    return allItems.filter((i) => 
      matches(i, query) && matchesFileType(i, fileType)
    );
  }, [query, fileType, userUploads, htmlFiles]);

  const handleCopy = async (path: string) => {
    const url = getAbsoluteUrl(path);
    try {
      await navigator.clipboard.writeText(url);
      toast.success("CDN link copied", { 
        description: url,
        className: "elegant-card"
      });
    } catch (e) {
      toast.error("Failed to copy link", {
        className: "elegant-card"
      });
    }
  };

  const handleOpenInWindow = (path: string) => {
    const url = getAbsoluteUrl(path);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="container py-8">
      {loading ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading images...</p>
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">No results. Try another search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((img, idx) => {
            const isImage = /\.(png|jpe?g|svg)$/i.test(img.filename);
            const isGif = /\.gif$/i.test(img.filename);
            const isVideo = /\.(mp4|mov|avi|webm|mkv)$/i.test(img.filename);
            const isHtml = /\.(html|htm)$/i.test(img.filename);
            const isPdf = /\.pdf$/i.test(img.filename);
            const isLink = (img as any).isLink;
            const title = (img as any).title || img.filename;
            const alt = (img as any).alt ?? `${title} image`;
            const sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

            const renderPreview = () => {
              if (isVideo) {
                return (
                  <LazyVideo
                    src={img.filename}
                    width={img.width}
                    height={img.height}
                    priority={idx < 6}
                    className="h-full w-full object-cover"
                    muted
                    loop
                  />
                );
              } else if (isImage || isGif) {
                return (
                  <LazyImage
                    src={img.filename}
                    alt={alt}
                    width={img.width}
                    height={img.height}
                    priority={idx < 6}
                    sizes={sizes}
                    className="h-full w-full object-cover"
                  />
                );
              } else if (isHtml) {
                return (
                  <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 bg-muted/20">
                    <div className="text-2xl mb-2">📄</div>
                    <div className="text-sm font-medium text-foreground">{title}</div>
                    <div className="text-xs text-muted-foreground mt-1">HTML Ticket</div>
                  </div>
                );
              } else if (isPdf) {
                return (
                  <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 bg-muted/20">
                    <div className="text-2xl mb-2">📋</div>
                    <div className="text-sm font-medium text-foreground">{title}</div>
                    <div className="text-xs text-muted-foreground mt-1">PDF Document</div>
                  </div>
                );
              } else if (isLink) {
                return (
                  <div className="h-full w-full flex flex-col items-center justify-center text-center p-4 bg-muted/20">
                    <div className="text-2xl mb-2">🔗</div>
                    <div className="text-sm font-medium text-foreground">{title}</div>
                    <div className="text-xs text-muted-foreground mt-1 truncate">{img.filename}</div>
                  </div>
                );
              } else {
                return (
                  <div className="h-full w-full flex items-center justify-center text-xs sm:text-sm text-muted-foreground">
                    {title} (download-only file)
                  </div>
                );
              }
            };

            const renderDialog = () => {
              if (isVideo) {
                return (
                  <div className="w-full">
                    <LazyVideo
                      src={img.filename}
                      className="w-full h-auto rounded-md"
                      priority
                      controls
                    />
                  </div>
                );
              } else if (isImage || isGif) {
                return (
                  <div className="w-full">
                    <LazyImage
                      src={img.filename}
                      alt={alt}
                      className="w-full h-auto rounded-md"
                      priority
                    />
                  </div>
                );
              } else if (isHtml) {
                return (
                  <div className="w-full">
                    <iframe
                      src={img.filename}
                      className="w-full h-96 rounded-md border border-border"
                      title={title}
                    />
                  </div>
                );
              } else if (isPdf) {
                return (
                  <div className="w-full">
                    <iframe
                      src={img.filename}
                      className="w-full h-96 rounded-md border border-border"
                      title={title}
                    />
                  </div>
                );
              } else if (isLink) {
                return (
                  <div className="w-full text-center p-8">
                    <div className="text-4xl mb-4">🔗</div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground mb-4">{img.filename}</p>
                    <Button 
                      onClick={() => window.open(img.filename, '_blank', 'noopener,noreferrer')}
                      className="elegant-button"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Link
                    </Button>
                  </div>
                );
              }
              return null;
            };

            return (
              <article key={img.filename} className="group elegant-card rounded-xl overflow-hidden elegant-border hover:scale-[1.02] transition-all duration-300">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative cursor-pointer">
                      <div className="aspect-[16/9] bg-muted/20 overflow-hidden">
                        {renderPreview()}
                      </div>
                      {/* Hover overlay with expand button */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" variant="secondary" className="elegant-button">
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Expand
                        </Button>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl elegant-card">
                    <DialogHeader>
                      <DialogTitle className="truncate text-xl font-bold text-foreground">{title}</DialogTitle>
                      <DialogDescription className="truncate text-muted-foreground">{img.filename}</DialogDescription>
                    </DialogHeader>
                    {renderDialog()}
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="text-sm text-muted-foreground">
                        {img.isUserUpload ? (
                          <>Uploaded by: <span className="text-foreground font-medium">{img.uploader || "Unknown"}</span></>
                        ) : (
                          <>Static CDN file</>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleCopy(img.filename)} className="elegant-button">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                        {isLink ? (
                          <Button size="sm" variant="outline" onClick={() => handleOpenInWindow(img.filename)} className="elegant-button">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleOpenInWindow(img.filename)} className="elegant-button">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold truncate mb-1 text-foreground">{title}</h3>
                      <p className="text-sm text-muted-foreground truncate" title={img.filename}>{img.filename}</p>
                    </div>
                  <div className="flex gap-2">
                    {isLink ? (
                      <Button size="sm" onClick={() => handleOpenInWindow(img.filename)} className="elegant-button flex-1" aria-label={`Visit ${title}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </Button>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => handleCopy(img.filename)} className="elegant-button flex-1" aria-label={`Copy CDN link for ${title}`}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleOpenInWindow(img.filename)} className="elegant-button" aria-label={`Open ${title} in new window`}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CDNGrid;
