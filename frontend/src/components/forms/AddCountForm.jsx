import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { useParticipants } from "@/features/participants";
import { useParticipantMutation } from "@/features/participants/mutations/useParticipantMutations";
import { AutocompleteSelect } from "../ui/AutocompleteSelect";
import { formatDate } from "@/utils/formateDate";

// ---------------- Schema ----------------
const addCountSchema = z.object({
  participantId: z.string().min(1, "Please select your name"),

  count: z
    .number({
      invalid_type_error: "Please enter a count",
    })
    .min(1, "Please add your count")
    .max(100000, "Count must be less than 10,0000"),
});

// ---------------- Component ----------------
export function AddCountForm({ className, ...props }) {
  const { data: Participants } = useParticipants();
  const { updateParticipant, isUpdating } = useParticipantMutation();

  const [feedback, setFeedback] = useState({ type: null, message: "" });

  const form = useForm({
    resolver: zodResolver(addCountSchema),
    defaultValues: {
      participantId: "",
      count: "",
    },
    mode: "onChange",
  });

  console.log(Participants?.data);

  const handleSubmit = async (data) => {
    try {
      const selectedParticipant = Participants?.data?.find(
        (p) => p._id === data?.participantId
      );

      if (!selectedParticipant) {
        setFeedback({ type: "error", message: "Participant not found." });
        return;
      }

      const sumCounts = selectedParticipant.contributions.reduce(
        (sum, contribution) => sum + contribution.count,
        0
      );

      const updatedContribution = [
        { date: formatDate(new Date()), count: data.count },
      ];

      await updateParticipant({
        id: data.participantId,
        data: {
          contributions: updatedContribution,
          totalContributed: sumCounts + data.count,
        },
      });

      // form.reset();
      setFeedback({
        type: "success",
        message: "You submitted your salah count successfully!",
      });

      setTimeout(() => setFeedback({ type: null, message: "" }), 5000);
    } catch (error) {
      console.error("Failed to add daily count:", error);

      if (error?.response?.status === 404) {
        setFeedback({ type: "error", message: "Participant not found." });
      } else {
        setFeedback({
          type: "error",
          message: "Failed to submit count. Please try again later.",
        });
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
      {...props}
    >
      {/* Participant Select */}
      <div className="space-y-2">
        <Label htmlFor="participantId" className="text-lg font-medium">
          Your Name
        </Label>
        <Controller
          name="participantId"
          control={form.control}
          render={({ field }) => (
            <AutocompleteSelect
              participants={Participants?.data || []}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              placeholder="Select your name"
            />
          )}
        />

        {form.formState.errors.participantId && (
          <p className="text-destructive text-sm" role="alert">
            {form.formState.errors.participantId.message}
          </p>
        )}
      </div>

      {/* Count input */}
      <div className="space-y-2">
        <Label htmlFor="count" className="text-lg font-medium">
          Number of Salawath
        </Label>
        <Input
          id="count"
          type="number"
          placeholder="Enter your count (e.g., 100)"
          {...form.register("count", { valueAsNumber: true })}
          className={cn(
            "text-lg py-3",
            form.formState.errors.count &&
              "border-destructive focus:border-destructive"
          )}
        />
        <div id="count-help" className="text-xs text-muted-foreground">
          Enter a number between 1 and 10,000
        </div>
        {form.formState.errors.count && (
          <p id="count-error" className="text-destructive text-sm" role="alert">
            {form.formState.errors.count.message}
          </p>
        )}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full text-lg py-4"
        disabled={isUpdating}
        aria-label={isUpdating ? "Submitting count..." : "Submit count"}
      >
        <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
        {isUpdating ? "Submitting..." : "Submit Count"}
      </Button>

      {/* Feedback messages */}
      {feedback.type === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-800">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      {feedback.type === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-800">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}
    </form>
  );
}
