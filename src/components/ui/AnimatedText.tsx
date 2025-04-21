
import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  texts: string[];
  className?: string;
}

export const AnimatedText = ({ texts, className = '' }: AnimatedTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Adding text
        if (displayText.length < texts[currentTextIndex].length) {
          setDisplayText(texts[currentTextIndex].substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause at the end
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Removing text
        if (displayText.length > 0) {
          setDisplayText(texts[currentTextIndex].substring(0, displayText.length - 1));
          setTypingSpeed(75);
        } else {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentTextIndex, displayText, isDeleting, texts, typingSpeed]);

  return (
    <span className={`typewriter ${isDeleting ? '' : 'typing'} ${className}`}>
      {displayText}
    </span>
  );
};

export default AnimatedText;
