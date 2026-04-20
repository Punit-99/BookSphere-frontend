// types.ts

export type Movie = {
  id: string;
  title: string;
  description?: string;
  duration: number;
  language: string[];
  genre: string[];
  releaseDate: string;
  poster?: string[];
};

export type MovieProps = {
  mode?: "create" | "edit";
  initialData?: any;
  onSuccess?: () => void;
  onClose?: () => void;
};

export type MovieInput = {
  title: string;
  description?: string;
  duration: number;
  language: string[];
  genre: string[];
  releaseDate?: string;
  poster?: string[];
};

export type Theatre = {
  id: string;
  name: string;
  state: string;
  city: string;
  address?: string;
  screens: number;
};

// 🔥 NEW
export type TheatreListProps = {
  mode?: "normal" | "select";
  onSelect?: (theatre: Theatre) => void;
};

export type TheatreFormData = {
  name: string;
  state: string;
  city: string;
  address?: string;
  screens: number;
};

export type ShowFormProps = {
  theatre: any;
  movie: any;
  show?: any;
  onSuccess: () => void;
};

export type ShowListMap = {
  id: string;
  showTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  movie: any;
  theatre: any;
};

export type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type AppDialogProps = {
  title?: string;
  children: React.ReactNode | ((close: () => void) => React.ReactNode);
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SteppingStep = {
  label: string;
  content: React.ReactNode;
};

export type SteppingStepProps = {
  steps: SteppingStep[];
  currentStep: number;
  setStep: (step: number) => void;
};

export type DateTimePickerProps = {
  value?: Date;
  onChange: (date: Date) => void;
  mode?: "date" | "datetime";
};

type Image = {
  url: string;
  public_id?: string;
};

export type ImageCarouselProps = {
  images: Image[];
  onDelete?: (index: number) => void;
  onAddMore?: () => void;
};

export type ImageUploaderProps = {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
};
export type MovieCardProps = {
  movie: any;

  mode?: "admin" | "select" | "user";

  onEdit?: (movie: any) => void;
  onDelete?: (id: string) => void;

  onSelect?: (movie: any) => void;

  onDetails?: (movie: any) => void;

  selected?: boolean;
};

export type TheatreCardProps = {
  theatre: any;

  mode?: "admin" | "select" | "user";

  onEdit?: (theatre: any) => void;
  onDelete?: (id: string) => void;

  onSelect?: (theatre: any) => void;

  selected?: boolean;
};

type SkeletonVariant = "card" | "row" | "show" | "page";

export type AppSkeletonProps = {
  variant?: SkeletonVariant;
  count?: number;
  className?: string;
};
