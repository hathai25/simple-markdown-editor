'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useMarkdownStore, Draft } from '@/store/useMarkdownStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import DraftActions from './DraftActions';
import RenameInput from './RenameInput';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DraftSidebar() {
  const { drafts, activeDraftId, setActiveDraft, createDraft, deleteDraft, updateActiveDraftTitle } = useMarkdownStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [renamingDraftId, setRenamingDraftId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<Draft | null>(null);

  const prevDraftsLengthRef = useRef(drafts.length);

  useEffect(() => {
    if (drafts.length > prevDraftsLengthRef.current && activeDraftId === drafts[0]?.id) {
      const newDraftId = drafts[0].id;
      setTimeout(() => {
        const newDraftElement = document.getElementById(`draft-item-${newDraftId}`);
        newDraftElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
    prevDraftsLengthRef.current = drafts.length;
  }, [drafts, activeDraftId]);

  const handleRenameStart = (draft: Draft) => {
    setRenamingDraftId(draft.id);
    setTempTitle(draft.title);
  };

  const handleRenameConfirm = () => {
    if (renamingDraftId && tempTitle.trim() !== '') {
      updateActiveDraftTitle(renamingDraftId, tempTitle.trim());
    }
    setRenamingDraftId(null);
    setTempTitle('');
  };

  const handleRenameCancel = () => {
    setRenamingDraftId(null);
    setTempTitle('');
  };

  const openDeleteModal = (draft: Draft) => {
    setDraftToDelete(draft);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDraftToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteDraft = () => {
    if (draftToDelete) {
      deleteDraft(draftToDelete.id);
    }
    closeDeleteModal();
  };

  return (
    <>
      <div className={`h-full bg-card border-r border-border flex flex-col flex-shrink-0 transition-all duration-200 ${isCollapsed ? 'w-16' : 'w-72'}`}>
        <div className="p-3 border-b border-border h-[57px] flex items-center justify-between flex-shrink-0">
          {!isCollapsed && <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Drafts</h2>}
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <div className="p-3 mt-1.5 flex-shrink-0">
          <Button
            onClick={createDraft}
            variant="default"
            size="sm"
            className="w-full"
            title="Create new draft"
          >
            <PlusCircle size={16} className={!isCollapsed ? "mr-2" : ""} />
            {!isCollapsed && (
              <span
                style={{ transition: 'opacity 0.2s ease-in-out, max-width 0.2s ease-in-out' }}
                className={`overflow-hidden whitespace-nowrap ${
                  isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
                }`}
              >
                New Draft
              </span>
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-1.5">
          <div className="space-y-0.5">
            {drafts.map((draft, index) => (
              <div
                key={draft.id}
                id={`draft-item-${draft.id}`}
                onClick={() => {
                  if (renamingDraftId !== draft.id) {
                    setActiveDraft(draft.id);
                  }
                }}
                data-active={draft.id === activeDraftId}
                className={`group flex items-center p-2 rounded-md transition-colors duration-150 cursor-pointer 
                            text-muted-foreground 
                            data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:font-semibold 
                            hover:bg-accent hover:text-accent-foreground
                            ${isCollapsed ? 'justify-center' : 'justify-between'}`}
              >
                {renamingDraftId === draft.id ? (
                  <RenameInput
                    value={tempTitle}
                    onChange={setTempTitle}
                    onConfirm={handleRenameConfirm}
                    onCancel={handleRenameCancel}
                    className="flex-grow w-full"
                  />
                ) : (
                  <>
                    <div
                      className={`flex items-center text-xs font-medium overflow-hidden ${isCollapsed ? '' : 'w-0 flex-grow min-w-0'}`}
                      title={draft.title}
                    >
                      <span className="flex-shrink-0 pr-1">
                        {`${index + 1}.`}
                      </span>
                      {!isCollapsed && (
                        <span
                          style={{ transition: 'opacity 0.2s ease-in-out, margin-left 0.2s ease-in-out' }}
                          className={`truncate block opacity-100`}
                        >
                          {draft.title}
                        </span>
                      )}
                    </div>

                    {!isCollapsed && (
                      <DraftActions
                        draft={draft}
                        isActive={draft.id === activeDraftId}
                        onRename={() => handleRenameStart(draft)}
                        onDelete={() => openDeleteModal(draft)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-2 text-xs text-center text-muted-foreground border-t border-border sticky bottom-0 bg-card z-10 h-[37px] flex items-center justify-center flex-shrink-0">
          {drafts.length} draft{drafts.length === 1 ? '' : 's'}
        </div>
      </div>

      {draftToDelete && (
        <Dialog open={isDeleteModalOpen} onOpenChange={(isOpen) => !isOpen && closeDeleteModal()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Draft</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-10 w-10 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Are you sure you want to delete the draft titled 
                    <strong className="text-destructive"> &quot;{draftToDelete.title}&quot;</strong>?
                  </p>
                  <p className="mt-1 text-muted-foreground text-sm">
                    This action cannot be undone. All content of this draft will be permanently lost.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button 
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                onClick={confirmDeleteDraft}
                variant="destructive"
                size="sm"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
} 
 