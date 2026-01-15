class ImageCache {
  private cache: Map<string, HTMLImageElement> = new Map();

  preload(filename: string): HTMLImageElement {
    if (this.cache.has(filename)) {
      return this.cache.get(filename)!;
    }

    const img = new Image();
    const path = `/images/${filename}`;
    img.src = path;
    this.cache.set(filename, img);
    return img;
  }

  preloadAll(filenames: string[]): void {
    filenames.forEach((filename) => this.preload(filename));
  }

  getSrc(filename: string, fallback: string = "/images/default.webp"): string {
    return this.cache.has(filename) ? `/images/${filename}` : fallback;
  }
}

export const imageCache = new ImageCache();
