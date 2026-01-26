"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6 max-w-md">
        <div className="text-6xl mb-6"></div>
        <h1 className="font-serif text-3xl text-foreground font-light mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-muted-foreground mb-8">
          We couldn't load the menu. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
