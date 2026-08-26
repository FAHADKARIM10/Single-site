import { icons, HelpCircle, type LucideProps } from "lucide-react";

/** Renders a lucide-react icon looked up by its string name (as stored in
 *  content/categories.json), falling back to a generic icon if the name
 *  doesn't match a known export. */
export function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? HelpCircle;
  return <Icon {...props} />;
}
