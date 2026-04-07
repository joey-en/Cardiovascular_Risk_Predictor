import type { Metadata } from "next";
import { AssessmentResultClient } from "./AssessmentResultClient";

export const metadata: Metadata = {
  title: "Assessment Result",
};

export default function AssessmentResultPage() {
  return <AssessmentResultClient />;
}
