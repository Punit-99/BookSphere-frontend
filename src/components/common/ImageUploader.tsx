import { useEffect, useState } from "react";
import { uploadImages, deleteImage } from "@/api/upload";
import { Progress } from "@/components/ui/progress";
import ImageCarousel from "./ImageCarousel";
import type { ImageUploaderProps } from "@/lib/types";

const ImageUploader = ({ label, value, onChange }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<{ url: string; public_id: string }[]>(
    [],
  );

  // sync external value
  useEffect(() => {
    if (value?.length) {
      setImages(value.map((url) => ({ url, public_id: "" })));
    } else {
      setImages([]);
    }
  }, [value]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      setProgress(20);

      const res = await uploadImages(Array.from(files));

      const updated = [...images, ...(res || [])];
      setImages(updated);
      onChange(updated.map((r: any) => r.url));

      setProgress(100);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (index: number) => {
    const img = images[index];
    if (img?.public_id) {
      await deleteImage(img.public_id);
    }

    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange(updated.map((i) => i.url));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative w-full h-80 border border-dashed rounded-xl flex items-center justify-center overflow-visible">
        <input
          id="upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />

        {/* EMPTY */}
        {images.length === 0 && !uploading && (
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById("upload")?.click()}
          >
            <p className="text-sm opacity-60">Click or Drop Images Here</p>
          </div>
        )}

        {/* SINGLE IMAGE */}
        {images.length === 1 && (
          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src={images[0].url}
              alt="preview"
              className="max-w-full max-h-full object-contain"
            />

            {/* DELETE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(0);
              }}
              className="absolute top-2 right-2 border rounded-full w-7 h-7 text-xs"
            >
              ✕
            </button>

            {/* CHANGE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById("upload")?.click();
              }}
              className="absolute bottom-2 left-2 border px-2 py-1 text-xs rounded"
            >
              Change
            </button>
          </div>
        )}

        {/* MULTIPLE IMAGES */}
        {images.length > 1 && (
          <ImageCarousel
            images={images}
            onDelete={handleDelete}
            onAddMore={() => document.getElementById("upload")?.click()}
          />
        )}

        {/* LOADING */}
        {uploading && (
          <div className="absolute bottom-0 left-0 w-full p-2">
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
