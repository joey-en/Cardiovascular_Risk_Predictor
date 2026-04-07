import { AssessmentShell } from "@/components/AssessmentShell";

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssessmentShell>{children}</AssessmentShell>;
}
