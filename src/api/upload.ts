import { REST } from "@/api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const uploadImages = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await REST.post("/api/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.urls.map((item: any) => {
    if (typeof item === "string") {
      return {
        url: item.startsWith("http") ? item : BASE_URL + item,
        public_id: "",
      };
    }

    if (item.url) {
      return {
        url: item.url.startsWith("http") ? item.url : BASE_URL + item.url,
        public_id: item.public_id || "",
      };
    }

    if (item.path) {
      return {
        url: item.path.startsWith("http") ? item.path : BASE_URL + item.path,
        public_id: item.public_id || "",
      };
    }

    return {
      url: "",
      public_id: "",
    };
  });
};

export const deleteImage = async (publicId: string) => {
  return REST.post("/api/upload/delete", {
    publicId,
  });
};
