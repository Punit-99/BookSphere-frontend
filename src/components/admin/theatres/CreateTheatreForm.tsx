import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { theatreSchema } from "@/lib/schemas";
import type { TheatreFormData } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createTheatre, updateTheatre } from "@/store/theatres/theatreSlice";
import { fetchConstants } from "@/store/constant/ConstantsSlice";

const TheatreForm = ({ mode, initialData, onSuccess, onClose }: any) => {
  const dispatch = useDispatch();

  const locations = useSelector((s: any) => s.constant.locations);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TheatreFormData>({
    resolver: zodResolver(theatreSchema),
    defaultValues: {
      name: "",
      state: "",
      city: "",
      address: "",
      screens: 0,
    },
  });

  const state = watch("state");
  const cities = state ? locations?.[state] || [] : [];

  // ================= FETCH CONSTANTS =================
  useEffect(() => {
    if (!locations || Object.keys(locations).length === 0) {
      dispatch(fetchConstants() as any);
    }
  }, [dispatch]);

  // ================= PREFILL =================
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        state: initialData.state ?? "",
        city: initialData.city ?? "",
        address: initialData.address ?? "",
        screens: initialData.screens ?? 0,
      });
    }
  }, [initialData, reset]);

  // ================= RESET CITY ON STATE CHANGE =================
  useEffect(() => {
    setValue("city", "", { shouldValidate: true });
  }, [state, setValue]);

  // ================= SUBMIT =================
  const onSubmit = async (data: TheatreFormData) => {
    try {
      if (mode === "edit") {
        await dispatch(
          updateTheatre({
            id: initialData.id,
            input: data,
          }) as any,
        );
        toast.success("Theatre updated 🎉");
      } else {
        await dispatch(createTheatre(data) as any);
        toast.success("Theatre created 🎉");
      }

      reset();
      onSuccess?.();
      onClose?.();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // ================= UI =================
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* NAME */}
      <div>
        <Label>Name</Label>
        <Input {...register("name")} placeholder="Theatre name" />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* STATE */}
      <div>
        <Label>State</Label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                setValue("city", "", { shouldValidate: true });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(locations || {}).map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.state && (
          <p className="text-sm text-red-500">{errors.state.message}</p>
        )}
      </div>

      {/* CITY */}
      <div>
        <Label>City</Label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!state}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c: string) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* ADDRESS */}
      <div>
        <Label>Address</Label>
        <Input {...register("address")} placeholder="Full address" />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* SCREENS */}
      <div>
        <Label>Screens</Label>
        <Input
          type="number"
          {...register("screens", { valueAsNumber: true })}
        />
        {errors.screens && (
          <p className="text-sm text-red-500">{errors.screens.message}</p>
        )}
      </div>

      {/* SUBMIT */}
      <Button type="submit" className="w-full">
        {mode === "edit" ? "Update Theatre" : "Create Theatre"}
      </Button>
    </form>
  );
};

export default TheatreForm;
