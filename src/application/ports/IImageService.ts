export interface IImageService {
  validateSize(file: File, maxSize: number): void;
  fileToBase64(file: File): Promise<string>;
}
