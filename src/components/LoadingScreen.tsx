import { useState, useEffect } from "react";
import crcLogoSymbol from "@/assets/crc-logo-symbol.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds total
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadingComplete, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary-dark to-primary transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
      </div>

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated rings */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-white/20 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 border border-white/10 rounded-full animate-spin" style={{ animationDuration: "8s" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 border border-white/5 rounded-full animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
          </div>
          
          {/* Logo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center animate-logo-pulse">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
            <img
              src={crcLogoSymbol}
              alt="CRC"
              className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-2xl animate-logo-float"
            />
          </div>
        </div>

        {/* Brand text */}
        <div className="mt-8 sm:mt-10 text-center">
          <h1 className="text-white text-xl sm:text-2xl font-semibold tracking-wider animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Clinical Research Center
          </h1>
          <p className="text-white/60 text-sm mt-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            Excellence in Clinical Trials
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 sm:mt-10 w-48 sm:w-56">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/40 text-xs mt-3 text-center font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
