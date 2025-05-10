import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { Draft } from '@/store/useMarkdownStore';
import { Button } from '@/components/ui/button';

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
      {false && <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onRename(draft);
        }}
        variant="ghost"
        size="icon"
        className={`${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary-hover'} h-6 w-6`}
        title="Rename draft"
      >
        <Edit3 size={14} />
      </Button>}
     
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onDelete(draft);
        }}
        variant="ghost"
        size="icon"
        className={`text-muted-foreground hover:text-destructive h-6 w-6`}
        title="Delete draft"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
} 
