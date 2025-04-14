import React, { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface AutoResizingTextAreaProps {
  rows?: number;
  maxRows?: number;
  value?: string;
  onChange?: (value: string) => void;
  onHeightChange?: (height: number) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

const AutoResizingTextArea = ({
  rows = 10,
  maxRows = 24,
  value,
  onChange,
  onHeightChange,
  placeholder = "This is your space",
  label = "Text input area",
  id = "auto-resize-textarea",
  className,
}: AutoResizingTextAreaProps) => {
  const [text, setText] = useState<string>(value || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevHeight = useRef<number>(0);

  const updateHeight = () => {
    if (textareaRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textareaRef.current).lineHeight || "0"
      );
      const maxHeight = lineHeight * maxRows;
      textareaRef.current.style.maxHeight = `${maxHeight}px`;
      textareaRef.current.style.height = "auto";
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;

      // Notify parent of height change if it's different
      if (newHeight !== prevHeight.current) {
        onHeightChange?.(newHeight);
        prevHeight.current = newHeight;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange?.(newValue);
    updateHeight();
  };

  // Update height on value prop change
  useEffect(() => {
    if (value !== undefined && value !== text) {
      setText(value);
      updateHeight();
    }
  }, [value]);

  // Initial height setup
  useEffect(() => {
    updateHeight();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        ref={textareaRef}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={text}
        aria-label={label}
        aria-multiline="true"
        className={cn(
          "w-1/2 resize-y focus-visible:outline-none p-2 rounded-md",
          "no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]",
          "leading-6 min-h-[2.5rem]",
          className
        )}
        style={{
          height: `${Math.min(rows * 24, maxRows * 24)}px`,
        }}
      />
    </div>
  );
};

export default AutoResizingTextArea;
