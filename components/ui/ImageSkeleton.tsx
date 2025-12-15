import React, { useState } from 'react';

const ImageSkeleton = ({ className = "", alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Skeleton Loader - Visible only while loading */}
      <div 
        className={`absolute inset-0 bg-gray-200 animate-pulse z-0 ${isLoaded ? 'hidden' : 'block'}`}
      />
      
      {/* Actual Image - Fades in when loaded */}
      <img
        {...props}
        alt={alt || "Product image"}
        className={`${className} transition-opacity duration-700 ease-out relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};

export default ImageSkeleton;