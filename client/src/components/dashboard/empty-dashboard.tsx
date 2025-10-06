import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function EmptyDashboard() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed shadow-sm m-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold tracking-tight">
              No analyses yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter a URL above to start your first analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}