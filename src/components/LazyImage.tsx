import React, { useEffect, useRef, useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
}

const TRANSPARENT_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  ...rest
}) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(priority);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (priority || visible) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [priority, visible]);

  const handleError = () => {
    setLoadError(true);
  };

  if (loadError) {
    return (
      <div className={`flex items-center justify-center bg-muted/40 ${className || ''}`}>
        <div className="text-center text-sm text-muted-foreground">
          <p>Image unavailable</p>
          <p className="text-xs">{src.split('/').pop()}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={visible ? src : TRANSPARENT_PLACEHOLDER}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "auto" : "async"}
      fetchPriority={priority ? "high" : "low"}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
};

export default LazyImage;
