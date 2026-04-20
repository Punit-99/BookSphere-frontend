import { useState } from "react";

import SelectTheatreStep from "./SelectTheatreStep";
import SelectMovieStep from "./SelectMovieStep";
import ShowFormStep from "./ShowFormStep";

import SteppingStone from "@/components/common/CommonSteppingStone";
import { Button } from "@/components/ui/button";

export default function CreateShowWizard({ onClose, initialShow }: any) {
  const [step, setStep] = useState(initialShow ? 2 : 0);

  const [theatre, setTheatre] = useState<any>(initialShow?.theatre || null);
  const [movie, setMovie] = useState<any>(initialShow?.movie || null);

  const canContinue =
    (step === 0 && theatre) || (step === 1 && movie) || step === 2;

  const steps = [
    {
      label: "Theatre",
      content: <SelectTheatreStep selected={theatre} onSelect={setTheatre} />,
    },
    {
      label: "Movie",
      content: <SelectMovieStep selected={movie} onSelect={setMovie} />,
    },
    {
      label: "Create Show",
      content: (
        <ShowFormStep
          theatre={theatre}
          movie={movie}
          show={initialShow} // ✅ NEW
          onSuccess={onClose}
        />
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <SteppingStone steps={steps} currentStep={step} setStep={setStep} />

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          Back
        </Button>

        {step < 2 ? (
          <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
            Continue
          </Button>
        ) : (
          <Button form="create-show-form" type="submit">
            {initialShow ? "Update Show" : "Create Show"}
          </Button>
        )}
      </div>
    </div>
  );
}
