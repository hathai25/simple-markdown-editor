import React, { useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import Button from './Button';

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
      <input 
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onConfirm}
        onKeyDown={handleKeyDown}
        className={`w-full px-2 py-1 text-xs text-slate-900 border border-blue-500 rounded-md focus:ring-1 focus:ring-blue-500 outline-none`}
        autoFocus
      />
      <Button 
        onClick={(e) => {
          e.stopPropagation();
          onConfirm();
        }} 
        variant="ghost"
        size="xs"
        className="text-green-600 hover:text-green-700"
        title="Confirm rename"
        icon={<Check size={14}/>}
      />
      <Button 
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }} 
        variant="ghost"
        size="xs"
        className="text-red-500 hover:text-red-600"
        title="Cancel rename"
        icon={<X size={14}/>}
      />
    </div>
  );
} 
