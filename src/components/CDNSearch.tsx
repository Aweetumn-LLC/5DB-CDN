import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { Search } from "lucide-react";

interface CDNSearchProps {
  value: string;
  onChange: (v: string) => void;
}

const CDNSearch = ({ value, onChange }: CDNSearchProps) => {
  const id = useId();
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search premium assets, videos, and media..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 h-14 text-lg elegant-card border-0 bg-muted/20 backdrop-blur-sm placeholder:text-muted-foreground/70 focus:bg-muted/30 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default CDNSearch;
