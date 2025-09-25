import { useState, useEffect } from 'react';
import { cdnImages } from '@/data/cdnImages';

interface CDNStats {
  totalImages: number;
  totalStorageMB: number;
  loading: boolean;
}

export const useCDNStats = (): CDNStats => {
  const [stats, setStats] = useState<CDNStats>({
    totalImages: 0,
    totalStorageMB: 0,
    loading: true,
  });

  useEffect(() => {
    const calculateStats = async () => {
      try {
        const totalImages = cdnImages.length;
        let totalBytes = 0;

        // Get file sizes by fetching HEAD requests
        const sizePromises = cdnImages.map(async (image) => {
          try {
            const response = await fetch(image.filename, { method: 'HEAD' });
            const contentLength = response.headers.get('content-length');
            return contentLength ? parseInt(contentLength, 10) : 0;
          } catch {
            // If HEAD request fails, estimate based on file type
            const extension = image.filename.split('.').pop()?.toLowerCase();
            switch (extension) {
              case 'jpg':
              case 'jpeg':
                return 150000; // ~150KB average
              case 'png':
                return 300000; // ~300KB average
              case 'gif':
                return 500000; // ~500KB average
              case 'svg':
                return 10000; // ~10KB average
              case 'mp4':
              case 'mov':
                return 2000000; // ~2MB average
              default:
                return 100000; // ~100KB default
            }
          }
        });

        const sizes = await Promise.all(sizePromises);
        totalBytes = sizes.reduce((sum, size) => sum + size, 0);
        const totalStorageMB = Math.round((totalBytes / (1024 * 1024)) * 10) / 10;

        setStats({
          totalImages,
          totalStorageMB,
          loading: false,
        });
      } catch (error) {
        console.error('Error calculating CDN stats:', error);
        setStats({
          totalImages: cdnImages.length,
          totalStorageMB: 0,
          loading: false,
        });
      }
    };

    calculateStats();
  }, []);

  return stats;
};