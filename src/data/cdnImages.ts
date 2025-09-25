export type CDNImage = {
  filename: string;
  title: string;
  alt?: string;
  tags?: string[];
  width?: number;
  height?: number;
  uploader?: string;
  isUserUpload?: boolean;
};

const files = import.meta.glob("../../public/cdn/**/*.{png,jpg,jpeg,gif,svg,mp4,mov}", {
  as: "url",
  eager: true,
}) as Record<string, string>;

const toPublicPath = (path: string) => path.replace(/.*\/public/, "");
const toTitle = (path: string) => {
  const base = path.split("/").pop() || "";
  const name = base.replace(/\.[^.]+$/, "");
  return name
    .replace(/[\-_]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
};

const toTags = (path: string) => {
  const rel = toPublicPath(path);
  const parts = rel.split("/").filter(Boolean);
  return parts.filter((p) => p.toLowerCase() !== "cdn");
};

export const cdnImages: CDNImage[] = Object.keys(files)
  .sort()
  .map((fsPath) => {
    const filename = toPublicPath(fsPath).replace(/\\/g, "/");
    const title = toTitle(filename);
    const tags = toTags(fsPath);

    return {
      filename, 
      title,
      alt: `${title} image`,
      tags,
    } satisfies CDNImage;
  });
