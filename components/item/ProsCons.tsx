import { Check, X } from "lucide-react";

export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="card-flat" style={{ borderColor: "rgba(0,229,118,0.2)" }}>
        <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#00e576" }}>
          <Check size={18} aria-hidden />
          Pros
        </h3>
        <ul className="flex flex-col gap-2.5">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#92929f" }}>
              <Check size={16} aria-hidden className="flex-shrink-0 mt-0.5" style={{ color: "#00e576" }} />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-flat" style={{ borderColor: "rgba(255,92,92,0.2)" }}>
        <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: "#ff5c5c" }}>
          <X size={18} aria-hidden />
          Cons
        </h3>
        <ul className="flex flex-col gap-2.5">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#92929f" }}>
              <X size={16} aria-hidden className="flex-shrink-0 mt-0.5" style={{ color: "#ff5c5c" }} />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
