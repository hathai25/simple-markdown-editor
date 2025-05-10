import React from 'react';
import { /* Edit3, */ Edit3, Trash2 } from 'lucide-react';
import { Draft } from '@/store/useMarkdownStore';
import Button from './Button';

interface DraftActionsProps {
  draft: Draft;
  isActive: boolean;
  onRename: (draft: Draft) => void;
  onDelete: (draft: Draft) => void;
  className?: string;
}

export default function DraftActions({ draft, isActive, onRename, onDelete, className }: DraftActionsProps) {
  return (
    <div className={`flex items-center space-x-1 ${className || ''}`.trim()}>
      {/* temporarily hide rename button */}
      {false &&<Button
        onClick={(e) => {
          e.stopPropagation();
          onRename(draft);
        }}
        variant="ghost"
        size="xs"
        className={isActive ? 'text-blue-600' : 'text-slate-500 hover:text-blue-700'}
        title="Rename draft"
        icon={<Edit3 size={14} />}
      />}
     
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(draft);
        }}
        variant="danger-ghost"
        size="xs"
        className={isActive ? 'text-red-700' : ''}
        title="Delete draft"
        icon={<Trash2 size={14} />}
      />
    </div>
  );
} 
