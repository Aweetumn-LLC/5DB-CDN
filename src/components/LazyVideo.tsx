import React, { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  priority?: boolean;
  poster?: string;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  className,
  width,
  height,
  priority = false,
  poster,
  ...rest
}) => {
  const ref = useRef<HTMLVideoElement | null>(null);
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
          <p>Video unavailable</p>
          <p className="text-xs">{src.split('/').pop()}</p>
        </div>
      </div>
    );
  }

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      width={width}
      height={height}
      className={className}
      controls
      preload={priority ? "metadata" : "none"}
      poster={poster}
      onError={handleError}
      {...rest}
    />
  );
};

export default LazyVideo;