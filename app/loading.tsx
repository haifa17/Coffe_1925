export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 border-border border-t-primary animate-spin" />
        </div>
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Loading Menu...
        </p>
      </div>
    </div>
  );
}
