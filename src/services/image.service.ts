export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImageSize(file: File): void {
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('File too large. Max 5MB.');
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      validateImageSize(file);
    } catch (err) {
      reject(err);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
