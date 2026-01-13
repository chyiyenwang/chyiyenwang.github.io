class ImageCache {
  private cache: Map<string, HTMLImageElement> = new Map();

  preload(src: string): HTMLImageElement {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    const img = new Image();
    img.src = src;
    this.cache.set(src, img);
    return img;
  }

  preloadAll(srcs: string[]): void {
    srcs.forEach((src) => this.preload(src));
  }

  getSrc(src: string, fallback: string = '/default.webp'): string {
    return this.cache.has(src) ? src : fallback;
  }
}

export const imageCache = new ImageCache();