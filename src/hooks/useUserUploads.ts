import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { CDNImage } from '@/data/cdnImages';

export const useUserUploads = () => {
  const [userUploads, setUserUploads] = useState<CDNImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserUploads = async () => {
      try {
        const { data: files, error } = await supabase.storage
          .from('public')
          .list('users', {
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (error) {
          console.error('Error fetching user uploads:', error);
          return;
        }

        if (!files) return;

        const imageFiles = files.filter(file => 
          file.name && 
          /\.(png|jpe?g|gif|svg)$/i.test(file.name) &&
          !file.name.includes('/.')
        );

        const uploads: CDNImage[] = imageFiles.map(file => {
          const pathParts = file.name.split('/');
          const username = pathParts[0] || 'unknown';
          const filename = pathParts[pathParts.length - 1] || file.name;
          
          // Get public URL for the file
          const { data } = supabase.storage
            .from('public')
            .getPublicUrl(`users/${file.name}`);

          return {
            filename: data.publicUrl,
            title: filename.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/[\-_]+/g, ' '),
            alt: `Upload by ${username}`,
            tags: ['user-upload', username],
            uploader: username,
            isUserUpload: true
          };
        });

        setUserUploads(uploads);
      } catch (error) {
        console.error('Error in fetchUserUploads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserUploads();

    // Listen for new uploads
    const channel = supabase
      .channel('user-uploads')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'storage', 
          table: 'objects',
          filter: 'bucket_id=eq.public'
        },
        (payload: any) => {
          const name = payload?.new?.name as string | undefined;
          if (name && name.startsWith('users/') && /\.(png|jpe?g|gif|svg)$/i.test(name)) {
            // Refetch uploads when new files are added
            fetchUserUploads();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { userUploads, loading };
};