import type { IImageService } from '@/application/ports/IImageService';

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const imageService: IImageService = {
  validateSize(file: File, maxSize: number = MAX_IMAGE_SIZE): void {
    if (file.size > maxSize) {
      throw new Error('File too large. Max 5MB.');
    }
  },

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.validateSize(file);
      } catch (err) {
        reject(err);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },
};
