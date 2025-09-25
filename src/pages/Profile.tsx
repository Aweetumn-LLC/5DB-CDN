import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AuthButton from "@/components/AuthButton";
const Profile: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  

  const currentEmail = user?.email ?? "";
  const username = useMemo(() => {
    const meta = (user?.user_metadata || {}) as any;
    return meta?.username || currentEmail.split("@")[0] || "user";
  }, [user, currentEmail]);

  const [avatarUrl, setAvatarUrl] = useState<string>(
    (((user?.user_metadata || {}) as any)?.avatar_url as string) || ""
  );
  const [description, setDescription] = useState<string>(
    (((user?.user_metadata || {}) as any)?.description as string) || ""
  );

  const [savingAvatar, setSavingAvatar] = useState(false);
  const [savingDescription, setSavingDescription] = useState(false);

  useEffect(() => {
    // SEO basics for the page
    document.title = "Profile | Account Settings";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Manage your profile: set avatar via CDN and update your description."
      );
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content =
        "Manage your profile: set avatar via CDN and update your description.";
      document.head.appendChild(m);
    }
    // canonical
    let link: HTMLLinkElement | null = document.querySelector(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", window.location.href);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    // keep avatar input in sync if metadata changes
    const metaUrl = (((user?.user_metadata || {}) as any)?.avatar_url as string) || "";
    setAvatarUrl(metaUrl);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("storage-public")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "storage", table: "objects" },
        (payload: any) => {
          const b = payload?.new?.bucket_id as string | undefined;
          const name = payload?.new?.name as string | undefined;
          if (b === "public" && name && name.startsWith(`users/${username}/`)) {
            const { data } = supabase.storage.from("public").getPublicUrl(name);
            if (data?.publicUrl) {
              setAvatarUrl(data.publicUrl);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, username]);

  const onUpdateAvatar = async () => {
    if (!user) return;
    if (!avatarUrl) {
      toast("Avatar URL required", { description: "Please paste a valid CDN URL." });
      return;
    }
    setSavingAvatar(true);
    const { error } = await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });
    setSavingAvatar(false);
    if (error) {
      toast.error("Failed to update avatar", { description: error.message });
    } else {
      toast.success("Avatar updated", { description: "Your profile picture has been updated." });
    }
  };

  const onUpdateDescription = async () => {
    if (!user) return;
    setSavingDescription(true);
    const { error } = await supabase.auth.updateUser({ data: { description } });
    setSavingDescription(false);
    if (error) {
      toast.error("Failed to update description", { description: error.message });
    } else {
      toast.success("Description updated", { description: "Your profile description has been saved." });
    }
  };



  if (loading || !user) {
    return (
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <div className="space-y-6">
          <div className="h-10 w-40 bg-muted rounded animate-pulse" />
          <div className="h-40 w-full bg-muted rounded animate-pulse" />
          <div className="h-64 w-full bg-muted rounded animate-pulse" />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate("/")}>Back to home</Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your avatar and description.</p>
          </div>
        </div>
        <AuthButton />
      </header>

      <section className="mb-10 rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Profile picture</h2>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 grid gap-2">
            <Label htmlFor="avatarUrl">CDN Image URL (FiveM Database CDN)</Label>
            <Input
              id="avatarUrl"
              placeholder="https://cdn.FiveM Database.com/uploads/users/username/avatar.png"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Recommended path: uploads/users/test/... on your CDN. Paste the full CDN URL here.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="secondary" onClick={onUpdateAvatar} disabled={savingAvatar}>
            {savingAvatar ? "Saving..." : "Use CDN URL"}
          </Button>
        </div>
      </section>

      <section className="mb-10 rounded-lg border p-6">
        <h2 className="text-lg font-medium mb-4">Description</h2>
        <div className="grid gap-3">
          <Label htmlFor="description">About you</Label>
          <textarea
            id="description"
            className="min-h-[120px] w-full rounded-md border bg-background p-3 text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell others about yourself..."
          />
          <div>
            <Button onClick={onUpdateDescription} disabled={savingDescription}>
              {savingDescription ? "Saving..." : "Save description"}
            </Button>
          </div>
        </div>
      </section>

      <aside className="rounded-lg border p-4">
        <p className="text-xs text-muted-foreground">
          Need us to set up direct uploads to your FiveM Database CDN path (uploads/users/{username})? I can add an uploader that places files there if you share the CDN API details.
        </p>
      </aside>
    </main>
  );
};

export default Profile;
