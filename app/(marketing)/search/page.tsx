import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Section from "@/components/section";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams?.q ?? "").trim();
  const hasQuery = query.length > 0;

  return (
    <>
      <Section>
        <h1 className="text-[22px] font-semibold tracking-tight">Search</h1>
        <p className="mt-2 text-sm text-muted-foreground">{hasQuery ? `Results for "${query}"` : "Enter a query in the header search."}</p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {hasQuery ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Result #{i + 1}
                    <Badge variant="secondary">Sample</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">This is a placeholder search result for &quot;{query}&quot;.</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">No query provided.</div>
          )}
        </div>
      </Section>
    </>
  );
}
