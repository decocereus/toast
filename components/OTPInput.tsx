import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface OTPInputProps {
  value?: string;
  onChange: (value: string) => void;
  length: number;
  disabled?: boolean;
  containerClassName?: string;
  label?: string;
}

interface InputSlotProps {
  id: number;
  value: string;
  disabled?: boolean;
  onInputChange: (value: string, id: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
  inputRef: (element: HTMLInputElement | null) => void;
  onIos?: boolean;
}

const InputSlot = ({
  id,
  value,
  disabled,
  onInputChange,
  onKeyDown,
  inputRef,
  onIos = false,
}: InputSlotProps) => {
  return (
    <input
      ref={inputRef}
      type={onIos ? "tel" : "text"}
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      maxLength={1}
      value={value}
      disabled={disabled}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onInputChange(e.target.value, id)
      }
      onKeyDown={(e) => onKeyDown(e, id)}
      className={cn(
        "w-10 h-10 rounded-md text-center border text-lg font-semibold",
        "focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
        disabled ? "bg-gray-200 border-gray-200" : "bg-white border-black",
        onIos && "-webkit-appearance: none appearance: none"
      )}
    />
  );
};

const OTPInput = ({
  value,
  onChange,
  length,
  disabled,
  containerClassName,
  label,
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(
    value?.split("") ?? Array(length).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!inputRefs.current.length) {
    inputRefs.current = Array(length).fill(null);
  }

  const focusInput = (index: number, withDebounce = false) => {
    if (withDebounce) {
      setTimeout(() => {
        if (index >= 0 && index < length) {
          inputRefs.current[index]?.focus();
        }
      }, 10);
      return;
    }

    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData("text");
    if (!pastedData) return;
    const numbers = pastedData.match(/\d/g)?.slice(0, length) || [];
    const newOtp = [...otp];
    numbers.forEach((num: string, index: number) => {
      if (index < length) {
        newOtp[index] = num;
      }
    });
    setOtp(newOtp);
    onChange(newOtp.join(""));
    focusInput(Math.min(numbers.length, length - 1));
  };

  const handleInputChange = (value: string, currentIndex: number) => {
    if (!value.match(/^[0-9]*$/)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[currentIndex] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (!otp[currentIndex] && currentIndex > 0) {
        // If current input is empty, move to previous input
        focusInput(currentIndex - 1);
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[currentIndex] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
        focusInput(currentIndex - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusInput(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusInput(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setOtp(value.split("") ?? Array(length).fill(""));
    }
  }, [value, length]);

  return (
    <div
      className={cn("flex items-center gap-x-2 relative", containerClassName)}
      onPaste={handlePaste}
    >
      <label aria-label={label} className="sr-only">
        {label}
      </label>
      {Array.from({ length }).map((_, index) => (
        <InputSlot
          key={index}
          id={index}
          value={otp[index]}
          disabled={disabled}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          inputRef={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
