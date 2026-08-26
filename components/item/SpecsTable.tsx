import { Package, Tag, HardDrive, CalendarClock, Smartphone, Layers, ListChecks } from "lucide-react";

interface SpecsTableProps {
  name: string;
  category: string;
  fileSize: string;
  updatedAt: string;
  minAndroidVersion: string;
  version: string;
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function SpecsTable({ name, category, fileSize, updatedAt, minAndroidVersion, version }: SpecsTableProps) {
  const rows: { icon: React.ReactNode; label: string; value: React.ReactNode }[] = [
    { icon: <Package size={16} aria-hidden />, label: "App Name", value: name },
    { icon: <Tag size={16} aria-hidden />, label: "Category", value: category },
    { icon: <HardDrive size={16} aria-hidden />, label: "App Size", value: fileSize },
    {
      icon: <CalendarClock size={16} aria-hidden />,
      label: "Recent Update",
      value: <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>,
    },
    { icon: <Smartphone size={16} aria-hidden />, label: "Android Requirement", value: `${minAndroidVersion} and up` },
    { icon: <Layers size={16} aria-hidden />, label: "Version", value: version },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="specs-table-heading-icon">
          <ListChecks size={16} aria-hidden />
        </span>
        <div>
          <h2 className="text-xl font-black leading-tight" style={{ color: "#f4f4f8" }}>
            App Information
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#5c5c6b" }}>
            Quick facts, verified before every update
          </p>
        </div>
      </div>

      <div className="specs-table-card">
        <table className="specs-table">
          <caption className="sr-only">Key details for {name}</caption>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">
                  <span className="specs-table-label">
                    <span className="specs-table-icon">{row.icon}</span>
                    {row.label}
                  </span>
                </th>
                <td>
                  <span className="specs-table-value">{row.value}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
