import { redirect } from "next/navigation";

export default function LegacyInsightsHowScoreRedirect() {
  redirect("/assessment/how-score");
}
