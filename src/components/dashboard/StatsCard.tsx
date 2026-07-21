import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <Card className="shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-cyan-100 p-4">
          <Icon
            className="text-cyan-600"
            size={28}
          />
        </div>
      </CardContent>
    </Card>
  );
}