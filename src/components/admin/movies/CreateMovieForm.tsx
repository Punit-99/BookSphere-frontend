import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import ImageUploader from "@/components/common/ImageUploader";
import DateTimePicker from "@/components/common/DateTimePicker";

import type { MovieInput, MovieProps } from "@/lib/types";
import { movieSchema } from "@/lib/schemas";
import { fetchConstants } from "@/store/constant/ConstantsSlice";
import { createMovie, updateMovie } from "@/store/movies/movieSlice";

const CreateMovieForm = ({
  mode = "create",
  initialData,
  onSuccess,
  onClose,
}: MovieProps) => {
  const dispatch = useDispatch();

  const genres = useSelector((s: any) => s.constant.genres);
  const languages = useSelector((s: any) => s.constant.languages);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MovieInput>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 1,
      language: [],
      genre: [],
      releaseDate: "",
      poster: [],
    },
  });

  // ================= FETCH CONSTANTS =================
  useEffect(() => {
    if (!genres.length || !languages.length) {
      dispatch(fetchConstants() as any);
    }
  }, [dispatch]);

  // ================= PREFILL =================
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        duration: initialData.duration ?? 1,
        language: initialData.language ?? [],
        genre: initialData.genre ?? [],
        releaseDate: initialData.releaseDate ?? "",
        poster: initialData.poster ?? [],
      });
    }
  }, [initialData]);

  // ================= SUBMIT =================
  const onSubmit = async (data: MovieInput) => {
    try {
      if (mode === "edit") {
        await dispatch(
          updateMovie({
            id: initialData.id,
            input: data,
          }) as any,
        );
        toast.success("Movie updated 🎉");
      } else {
        await dispatch(createMovie(data) as any);
        toast.success("Movie created 🎉");
      }

      reset();
      onSuccess?.();
      onClose?.();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const isDisabled =
    !watch("title") ||
    !watch("duration") ||
    !watch("genre")?.length ||
    !watch("language")?.length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* ================= TITLE ================= */}
      <div>
        <Label>Title</Label>
        <Input {...register("title")} placeholder="Enter title" />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div>
        <Label>Description</Label>
        <Textarea
          {...register("description")}
          placeholder="Enter description"
        />
      </div>

      {/* ================= DURATION ================= */}
      <div>
        <Label>Duration (minutes)</Label>
        <Input
          type="number"
          {...register("duration", { valueAsNumber: true })}
          placeholder="Duration"
        />
        {errors.duration && (
          <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>
        )}
      </div>

      {/* ================= RELEASE DATE ================= */}
      <div>
        <Label>Release Date</Label>
        <DateTimePicker
          mode="date"
          value={
            watch("releaseDate") ? new Date(watch("releaseDate")!) : undefined
          }
          onChange={(date) =>
            setValue("releaseDate", date.toISOString(), {
              shouldDirty: true,
            })
          }
        />
      </div>

      {/* ================= LANGUAGE ================= */}
      <div>
        <Label>Language</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {languages.map((lang: string) => {
            const selected = watch("language") || [];

            return (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  setValue(
                    "language",
                    selected.includes(lang)
                      ? selected.filter((l) => l !== lang)
                      : [...selected, lang],
                    { shouldDirty: true },
                  );
                }}
                className={`px-3 py-1 border rounded-full text-sm ${
                  selected.includes(lang) ? "bg-black text-white" : ""
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>

        {errors.language && (
          <p className="text-sm text-red-500 mt-1">
            {errors.language.message as string}
          </p>
        )}
      </div>

      {/* ================= GENRE ================= */}
      <div>
        <Label>Genre</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {genres.map((g: string) => {
            const selected = watch("genre") || [];

            return (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setValue(
                    "genre",
                    selected.includes(g)
                      ? selected.filter((x) => x !== g)
                      : [...selected, g],
                    { shouldDirty: true },
                  );
                }}
                className={`px-3 py-1 border rounded-full text-sm ${
                  selected.includes(g) ? "bg-black text-white" : ""
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>

        {errors.genre && (
          <p className="text-sm text-red-500 mt-1">
            {errors.genre.message as string}
          </p>
        )}
      </div>

      {/* ================= IMAGE ================= */}
      <div>
        <ImageUploader
          label="Poster"
          value={watch("poster") || []}
          onChange={(v) => setValue("poster", v, { shouldDirty: true })}
        />
      </div>

      {/* ================= SUBMIT ================= */}
      <Button type="submit" className="w-full" disabled={isDisabled}>
        {mode === "edit" ? "Update Movie" : "Create Movie"}
      </Button>
    </form>
  );
};

export default CreateMovieForm;
