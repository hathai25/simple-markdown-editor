import React from 'react';
import { PlusCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateDraft: () => void;
}

export default function EmptyState({ onCreateDraft }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-background">
      <BookOpen size={40} className="text-secondary mb-4" />
      <h2 className="text-lg font-medium text-foreground mb-1">No Draft Selected</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">
        Select a draft from the sidebar to begin, or create a new one.
      </p>
      <Button 
        onClick={onCreateDraft}
        variant="default"
        size="sm"
      >
        <PlusCircle size={16} className="mr-2" />
        Create New Draft
      </Button>
    </div>
  );
} 
