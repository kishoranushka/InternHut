import { Card } from "@/components/ui/card";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl text-foreground">{title}</h1>
      <Card>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </div>
  );
}
