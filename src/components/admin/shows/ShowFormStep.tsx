import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import DateTimePicker from "@/components/common/DateTimePicker";
import { Input } from "@/components/ui/input";

import { createShow, updateShow } from "@/store/shows/showSlice";
import type { ShowFormProps } from "@/lib/types";

export default function ShowFormStep({
  theatre,
  movie,
  show,
  onSuccess,
}: ShowFormProps) {
  const dispatch = useDispatch();

  const { register, handleSubmit, control, setValue } = useForm<any>();

  const [editingShow, setEditingShow] = useState<any>(null);

  useEffect(() => {
    if (show) {
      setEditingShow(show);

      const d = new Date(show.showTime);
      if (!isNaN(d.getTime())) {
        setValue("showTime", d);
      }

      setValue("totalSeats", show.totalSeats);
      setValue("price", show.price);
    }
  }, [show]);

  const onSubmit = async (data: any) => {
    try {
      if (editingShow) {
        await dispatch(
          updateShow({
            id: editingShow.id,
            input: {
              movie: movie.id,
              theatre: theatre.id,
              showTime: data.showTime.toISOString(),
              totalSeats: Number(data.totalSeats),
              price: Number(data.price),
            },
          }) as any,
        );

        toast.success("Show updated ✏️");
      } else {
        await dispatch(
          createShow({
            theatre: theatre.id,
            movie: movie.id,
            showTime: data.showTime.toISOString(),
            totalSeats: Number(data.totalSeats),
            availableSeats: Number(data.totalSeats),
            price: Number(data.price),
          }) as any,
        );

        toast.success("Show created 🎉");
      }

      onSuccess();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      id="create-show-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3"
    >
      <Controller
        name="showTime"
        control={control}
        render={({ field }) => (
          <DateTimePicker
            mode="datetime"
            value={field.value || null}
            onChange={field.onChange}
          />
        )}
      />

      <Input
        type="number"
        placeholder="Total Seats"
        {...register("totalSeats", { valueAsNumber: true })}
      />

      <Input
        type="number"
        placeholder="Price"
        {...register("price", { valueAsNumber: true })}
      />
    </form>
  );
}
