
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  experience?: string;
}

export const ProgressBar = ({ label, percentage, experience }: ProgressBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate the progress bar when it becomes visible
    const timeout = setTimeout(() => {
      setWidth(percentage);
    }, 100);

    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="mb-6 group relative">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium">{label}</span>
        <span className="text-sm font-medium text-muted-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
      {experience && (
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-background border shadow-lg rounded-md text-sm">
          {experience}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
