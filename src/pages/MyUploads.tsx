import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import LazyImage from "@/components/LazyImage";

const MyUploads: React.FC = () => {
  const { user, loading } = useAuth();
  const email = user?.email ?? "";
  const username = useMemo(() => {
    const meta = (user?.user_metadata || {}) as any;
    return meta?.username || email.split("@")[0] || "user";
  }, [user, email]);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [myImages, setMyImages] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    document.title = "My Uploads | Manage your images";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Upload images for review and manage your approved uploads."
      );
    }
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchMyImages = async () => {
      try {
        const { data: files, error } = await supabase.storage
          .from("public")
          .list(`users/${username}`, { sortBy: { column: "created_at", order: "desc" } });
        if (error) return;
        const imageFiles = (files || []).filter((f) => /\.(png|jpe?g|gif|svg)$/i.test(f.name));
        const urls = imageFiles.map((f) => {
          const { data } = supabase.storage
            .from("public")
            .getPublicUrl(`users/${username}/${f.name}`);
          return data.publicUrl;
        });
        setMyImages(urls);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchMyImages();
  }, [user, username]);

  const onFileChange = (f: File | null) => {
    setFile(f);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(f ? URL.createObjectURL(f) : null);
  };

  const fileToBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        const b64 = res.includes(",") ? res.split(",")[1] : res;
        resolve(b64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  const submitForReview = async () => {
    if (!user || !file) {
      toast("Select a file", { description: "Please choose an image to upload." });
      return;
    }
    try {
      setSubmitting(true);
      const base64 = await fileToBase64(file);
      const payload = {
        username,
        email,
        filename: file.name,
        contentType: file.type || "image/png",
        fileBase64: base64,
      };
      const { error } = await supabase.functions.invoke("submit-upload-review", {
        body: payload,
      });
      if (error) throw error;
      toast.success("Submitted for review", {
        description: "We manually review all uploads. Please wait for approval.",
      });
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } catch (e: any) {
      toast.error("Submission failed", { description: e?.message || "Try again later" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <div className="space-y-6">
          <div className="h-10 w-40 bg-muted rounded animate-pulse" />
          <div className="h-40 w-full bg-muted rounded animate-pulse" />
          <div className="h-64 w-full bg-muted rounded animate-pulse" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <p className="text-sm text-muted-foreground">Please sign in to manage your uploads.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Uploads</h1>
          <p className="text-sm text-muted-foreground">
            Upload images and submit for manual review. We manually review all uploads; please wait for approval.
          </p>
        </div>
      </header>

      <section className="mb-10 rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Upload image</h2>
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="grid gap-3">
            <Label htmlFor="imageFile">Choose image</Label>
            <Input id="imageFile" type="file" accept="image/*" onChange={(e) => onFileChange(e.target.files?.[0] ?? null)} />
            {previewUrl && (
              <div className="mt-2">
                <LazyImage src={previewUrl} alt="Preview of selected image" className="rounded-md border max-h-72 object-contain" />
              </div>
            )}
            <div>
              <Button onClick={submitForReview} disabled={submitting || !file}>
                {submitting ? "Submitting..." : "Submit for review"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">We manually review all uploads. Please wait for the upload to be approved.</p>
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Your uploads</h2>
        {loadingImages ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : myImages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No uploads found in your folder.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {myImages.map((url, idx) => (
              <article key={idx} className="rounded border">
                <LazyImage src={url} alt={`Upload ${idx + 1} by ${username}`} className="w-full h-40 object-cover rounded-t" />
                <div className="p-2">
                  <a href={url} target="_blank" rel="noreferrer" className="text-xs underline">
                    Open
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyUploads;
