import React from 'react';
import { PlusCircle, BookOpen } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  onCreateDraft: () => void;
}

export default function EmptyState({ onCreateDraft }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-background">
      <BookOpen size={40} className="text-secondary-light mb-4" />
      <h2 className="text-lg font-medium text-text mb-1">No Draft Selected</h2>
      <p className="text-sm text-text-light mb-6 max-w-xs">
        Select a draft from the sidebar to begin, or create a new one.
      </p>
      <Button 
        onClick={onCreateDraft}
        variant="primary"
        size="sm"
        icon={<PlusCircle size={16} />}
      >
        Create New Draft
      </Button>
    </div>
  );
} 
