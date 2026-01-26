"use client";

import { useEffect, useState } from "react";
import type { Restaurant } from "@/lib/types";

interface SplashScreenProps {
  onComplete: () => void;
  restaurant: Restaurant | null;
  duration?: number;
}

export function SplashScreen({ onComplete, restaurant, duration = 3000 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setFadeOut(true);
        setTimeout(onComplete, 600);
      }
    };
    requestAnimationFrame(animate);
  }, [duration, onComplete]);

  const name = restaurant?.name || "The 1925";
  const tagline = restaurant?.tagline || "TIME TO EAT, DRINK AND PARTY";

  const containerClass = fadeOut 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-600 opacity-0 pointer-events-none" 
    : "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-600 opacity-100";

  return (
    <div className={containerClass}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full border border-border animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-[20%] left-[5%] w-24 h-24 rounded-full border border-border animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-[40%] left-[15%] w-16 h-16 rounded-full bg-muted/30 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative flex items-center justify-center">
        <svg className="absolute w-56 h-56 animate-spin" style={{ animationDuration: "8s" }} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" className="text-border" />
        </svg>

        <svg className="absolute w-48 h-48" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${progress * 5.02} 502`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            className="text-foreground transition-all duration-100"
          />
        </svg>

        <div
          className="relative flex flex-col items-center justify-center transition-transform duration-700"
          style={{ transform: `scale(${0.8 + (progress / 100) * 0.2})` }}
        >
          {restaurant?.logo ? (
            <img
              src={restaurant.logo}
              alt={name}
              className="w-24 h-24 object-contain rounded-xl"
              style={{ opacity: progress > 20 ? 1 : 0, transition: "opacity 0.5s" }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <span
                className="text-primary text-lg font-light tracking-wider transition-opacity duration-500"
                style={{ opacity: progress > 20 ? 1 : 0 }}
              >
                The
              </span>
              <div className="flex items-center gap-0">
                <span
                  className="text-6xl font-bold text-foreground transition-all duration-500"
                  style={{ opacity: progress > 30 ? 1 : 0, transform: `translateX(${progress > 30 ? 0 : -20}px)` }}
                >
                  19
                </span>
                <span
                  className="text-6xl font-bold text-foreground transition-all duration-500"
                  style={{ opacity: progress > 50 ? 1 : 0, transform: `translateX(${progress > 50 ? 0 : 20}px)` }}
                >
                  25
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {restaurant?.logo && (
        <div
          className="mt-8 text-center transition-all duration-500"
          style={{ opacity: progress > 40 ? 1 : 0, transform: `translateY(${progress > 40 ? 0 : 20}px)` }}
        >
          <h1 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
            {name}
          </h1>
        </div>
      )}

      <div
        className="mt-8 text-center transition-all duration-700"
        style={{ opacity: progress > 70 ? 1 : 0, transform: `translateY(${progress > 70 ? 0 : 20}px)` }}
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-px bg-border" />
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{tagline}</span>
          <div className="w-8 h-px bg-border" />
        </div>
      </div>

      <div className="mt-16 w-48">
        <div className="h-0.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground tracking-widest">
          {progress < 100 ? "LOADING MENU" : "WELCOME"}
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-bounce"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          >
            <svg className="w-4 h-4 text-border" fill="currentColor" viewBox="0 0 24 24">
              {i % 3 === 0 && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />}
              {i % 3 === 1 && <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4 2.3-7.4-6-4.6h7.6z" />}
              {i % 3 === 2 && <path d="M4 4h16v16H4z" />}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
