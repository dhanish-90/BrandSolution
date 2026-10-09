/**
 * Client-Side Image Compression Utility
 * Resizes large photos to optimal web dimensions (max 1600px width/height)
 * and compresses them to lightweight JPEG/WebP data URLs, reducing a 5MB-10MB
 * phone photo down to ~100KB-250KB while retaining crisp retina quality.
 */

export function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's an SVG file, no need to rasterize/compress with canvas
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate proportional scale
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw base64 if canvas context is unavailable
          resolve(event.target?.result as string);
          return;
        }

        // Draw with high quality interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as JPEG (or WebP if supported)
        const format = file.type === 'image/png' && hasTransparency(ctx, width, height)
          ? 'image/webp'
          : 'image/jpeg';

        try {
          const compressedDataUrl = canvas.toDataURL(format, quality);
          resolve(compressedDataUrl);
        } catch {
          // Fallback
          resolve(event.target?.result as string);
        }
      };

      img.onerror = () => {
        resolve(event.target?.result as string);
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Quick check if PNG image has transparency
 */
function hasTransparency(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  try {
    // Sample a few pixels to check alpha
    const stepX = Math.max(1, Math.floor(width / 10));
    const stepY = Math.max(1, Math.floor(height / 10));
    for (let x = 0; x < width; x += stepX) {
      for (let y = 0; y < height; y += stepY) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        if (pixel[3] < 250) {
          return true;
        }
      }
    }
  } catch {
    return false;
  }
  return false;
}
