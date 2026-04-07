import { MaterialIcon } from "./MaterialIcon";

const FEATURES = [
  { icon: "cake" as const, label: "Age (or year of birth)" },
  { icon: "wc" as const, label: "Sex / gender" },
  { icon: "straighten" as const, label: "Height & weight (or BMI)" },
  { icon: "monitor_heart" as const, label: "Blood pressure (e.g. 120/80)" },
  { icon: "science" as const, label: "Cholesterol or lipids (if known)" },
  { icon: "water_drop" as const, label: "Blood sugar / diabetes status" },
  { icon: "smoke_free" as const, label: "Smoking & alcohol use" },
  { icon: "directions_run" as const, label: "Physical activity & diet" },
  { icon: "diversity_3" as const, label: "Family history of heart disease" },
  { icon: "medication" as const, label: "Medications & supplements" },
  { icon: "healing" as const, label: "Symptoms (chest pain, palpitations, etc.)" },
];

export function DescriptionFeaturesChecklist() {
  return (
    <div className="rounded-2xl border border-primary/15 bg-surface-container-lowest/90 p-5 shadow-sm">
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
        Include in your description
      </p>
      <p className="mb-4 text-xs leading-relaxed text-on-surface-variant">
        Mention what applies—the model works best when these topics appear somewhere in your text
        (you do not need to cover every line).
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <li
            key={f.label}
            className="flex items-start gap-2 rounded-lg bg-surface-container-low/80 px-2.5 py-2 text-sm text-on-surface"
          >
            <MaterialIcon name={f.icon} className="mt-0.5 shrink-0 text-primary" />
            <span className="leading-snug">{f.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
