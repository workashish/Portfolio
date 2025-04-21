import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  name: string;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  color?: string;
  description?: string;
}

export const SkillCard = ({ 
  name, 
  icon, 
  level, 
  color = 'bg-primary/10', 
  description 
}: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Map level to percentage
  const levelToPercentage = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 95
  };

  const percentage = levelToPercentage[level];

  return (
    <motion.div
      className={cn(
        "relative group rounded-xl p-6 bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300",
        isHovered && "shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mr-4", color)}>
          <img src={icon} alt={name} className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">{level}</p>
        </div>
      </div>

      {description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
      )}

      <div className="w-full bg-secondary rounded-full h-1.5 mb-1">
        <div 
          className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Hover effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SkillCard;
