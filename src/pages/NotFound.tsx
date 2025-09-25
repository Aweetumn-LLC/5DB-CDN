import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cdnImages } from "@/data/cdnImages";

const NotFound = () => {
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter to only image files (not videos)
  const imageFiles = cdnImages.filter(img => 
    img.filename.match(/\.(png|jpg|jpeg|gif|svg)$/i)
  );

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    if (imageFiles.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % imageFiles.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [imageFiles.length]);

  const currentImage = imageFiles[currentImageIndex];

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      {currentImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentImage.filename})`,
          }}
        />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl font-bold mb-6 text-white drop-shadow-2xl">
          WEE WOO
        </h1>
        <p className="text-2xl font-bold text-white mb-8 drop-shadow-lg">
          This page does not exist please return home
        </p>
        <a 
          href="/" 
          className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
