import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { useParticipants } from "@/features/participants";
import { useCampaignConfig } from "@/utils/campaignUtils";
import { useCreateDailyCount } from "@/features/daily-counts";

/**
 * Zod schema for validating the Add Count form inputs
 */
const addCountSchema = z.object({
  participantId: z
    .string()
    .min(1, "Please select your name")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), "Invalid participant selection"),
  count: z
    .number({
      required_error: "This field is required",
      invalid_type_error: "Please enter a valid number",
    })
    .positive("Must be a positive number")
    .min(1, "Count must be at least 1")
    .max(10000, "Count seems too high, please verify"),
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "Please enter a valid date",
  }),
});

export function AddCountForm({ className, ...props }) {
  // Campaign config and date helpers
  const { CAMPAIGN_CONFIG, isDateInCampaignPeriod, formatCampaignDate } =
    useCampaignConfig("68abe8f3712a5f6b47ded8a1");

  // Participants data
  const { data: Participants } = useParticipants();

  // Mutation hook for submitting count data
  const createDailyCount = useCreateDailyCount();

  // Local state for selected date
  const [selectedDate, setSelectedDate] = useState(undefined);

  // React Hook Form setup with Zod validation
  const form = useForm({
    resolver: zodResolver(addCountSchema),
    defaultValues: {
      participantId: "",
      count: "",
      date: undefined,
    },
    mode: "onChange",
  });

  // Form submission handler
  const handleSubmit = async (data) => {
    try {
      await createDailyCount.mutateAsync({
        participantId: data.participantId,
        count: data.count,
        date: data.date.toISOString().split("T")[0],
      });

      // Reset form and clear date selection
      form.reset();
      setSelectedDate(undefined);
    } catch (error) {
      console.error("Failed to add daily count:", error);
    }
  };

  // Date selection handler
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    form.setValue("date", date, { shouldValidate: true, shouldDirty: true });
  };

  // Participant selection handler
  const handleParticipantSelect = (participantId) => {
    form.setValue("participantId", participantId, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("space-y-6", className)}
      {...props}
    >
      {/* Participant Selection */}
      <div className="space-y-2">
        <Label htmlFor="participantId" className="text-lg font-medium">
          Your Name
        </Label>
        <Select
          onValueChange={handleParticipantSelect}
          aria-label="Select participant"
        >
          <SelectTrigger
            id="participantId"
            className={cn(
              "text-lg py-3",
              form.formState.errors.participantId &&
                "border-destructive focus:border-destructive"
            )}
            aria-invalid={!!form.formState.errors.participantId}
          >
            <SelectValue placeholder="Select your name" />
          </SelectTrigger>
          <SelectContent>
            {Participants?.data.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.participantId && (
          <p className="text-destructive text-sm" role="alert">
            {form.formState.errors.participantId.message}
          </p>
        )}
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <Label htmlFor="date" className="text-lg font-medium">
          Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal text-lg py-3",
                !selectedDate && "text-muted-foreground",
                form.formState.errors.date &&
                  "border-destructive focus:border-destructive"
              )}
              aria-label={
                selectedDate
                  ? `Selected date: ${format(selectedDate, "PPP")}`
                  : "Pick a date"
              }
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => !isDateInCampaignPeriod(date)}
              defaultMonth={CAMPAIGN_CONFIG.START_DATE}
              fromDate={CAMPAIGN_CONFIG.START_DATE}
              toDate={CAMPAIGN_CONFIG.END_DATE}
              initialFocus
              className="pointer-events-auto"
            />
            <div className="p-3 text-xs text-muted-foreground border-t">
              Valid dates: {formatCampaignDate(CAMPAIGN_CONFIG.START_DATE)} to{" "}
              {formatCampaignDate(CAMPAIGN_CONFIG.END_DATE)}
            </div>
          </PopoverContent>
        </Popover>
        {form.formState.errors.date && (
          <p className="text-destructive text-sm" role="alert">
            {form.formState.errors.date.message}
          </p>
        )}
      </div>

      {/* Count Input */}
      <div className="space-y-2">
        <Label htmlFor="count" className="text-lg font-medium">
          Number of Salawat
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
          min={1}
          max={10000}
          aria-invalid={!!form.formState.errors.count}
          aria-describedby={
            form.formState.errors.count ? "count-error" : "count-help"
          }
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

      {/* Submit Button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full text-lg py-4"
        disabled={createDailyCount.isPending}
        aria-label={
          createDailyCount.isPending ? "Submitting count..." : "Submit count"
        }
      >
        <Plus className="mr-2 h-5 w-5" aria-hidden="true" />
        {createDailyCount.isPending ? "Submitting..." : "Submit Count"}
      </Button>
    </form>
  );
}
