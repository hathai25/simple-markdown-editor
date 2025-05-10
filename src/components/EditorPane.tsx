import React from 'react';

interface EditorPaneProps {
  content: string;
  onChange: (content: string) => void;
  draftId: string;
}

export default function EditorPane({ content, onChange, draftId }: EditorPaneProps) {
  return (
    <div className="h-full flex flex-col bg-white border border-slate-300 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow duration-150 rounded-md">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 sm:p-5 bg-transparent resize-none focus:outline-none font-mono text-xs sm:text-sm leading-relaxed text-slate-700 placeholder-slate-500 tracking-tight [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb:hover]:block [&::-webkit-scrollbar-thumb:active]:block"
        placeholder="# Start typing your markdown here..."
        key={draftId}
        spellCheck="false"
      />
    </div>
  );
} 
