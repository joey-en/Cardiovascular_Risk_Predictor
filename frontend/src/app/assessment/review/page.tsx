import type { Metadata } from "next";
import { ReviewForm } from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Review & Confirm Information",
};

export default function ReviewPage() {
  return <ReviewForm />;
}
