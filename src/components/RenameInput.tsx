import React, { useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RenameInputProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export default function RenameInput({ value, onChange, onConfirm, onCancel, className }: RenameInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      // Small delay to ensure the input is rendered
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className={`flex-grow flex items-center gap-1 ${className || ''}`.trim()}>
      <Input 
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onConfirm}
        onKeyDown={handleKeyDown}
        className={`w-full px-2 py-1 text-xs text-foreground`}
        autoFocus
      />
      <Button 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onConfirm();
        }} 
        variant="ghost"
        size="icon"
        className="text-success hover:text-success-hover h-6 w-6"
        title="Confirm rename"
      >
        <Check size={14}/>
      </Button>
      <Button 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onCancel();
        }} 
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive-hover h-6 w-6"
        title="Cancel rename"
      >
        <X size={14}/>
      </Button>
    </div>
  );
} 
