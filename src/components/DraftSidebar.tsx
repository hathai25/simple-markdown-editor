'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useMarkdownStore } from '@/store/useMarkdownStore';
import Modal from './Modal';
import DraftActions from './DraftActions';
import RenameInput from './RenameInput';
import Button from './Button';

export default function DraftSidebar() {
  const { drafts, activeDraftId, setActiveDraft, createDraft, deleteDraft, updateActiveDraftTitle } = useMarkdownStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [renamingDraftId, setRenamingDraftId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<{ id: string; title: string } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevDraftsLengthRef = useRef(drafts.length);

  useEffect(() => {
    if (drafts.length > prevDraftsLengthRef.current && activeDraftId === drafts[0]?.id) {
      const newDraftId = drafts[0].id;
      setTimeout(() => {
        const newDraftElement = document.getElementById(`draft-item-${newDraftId}`);
        if (newDraftElement) {
          newDraftElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0); // Defer to allow DOM update
    }
    prevDraftsLengthRef.current = drafts.length;
  }, [drafts, activeDraftId]);

  const handleRenameStart = (draft: { id: string; title: string }) => {
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

  const openDeleteModal = (draft: { id: string; title: string }) => {
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
      <div className={`h-full bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-200 ${isCollapsed ? 'w-16' : 'w-72'}`}>
        <div className="p-3 border-b border-slate-200 h-[57px] flex items-center justify-between">
          {!isCollapsed && <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Drafts</h2>}
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            size="xs"
            className="p-1.5 text-slate-500 hover:text-blue-600"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            icon={isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          />
        </div>

        <div className="p-3 mt-1.5">
          <Button
            onClick={createDraft}
            variant="primary"
            size="xs"
            className="w-full"
            title="Create new draft"
            icon={<PlusCircle size={14} />}
            iconPosition="left"
          >
            <span
              style={{ transition: 'opacity 0.2s ease-in-out, max-width 0.2s ease-in-out' }}
              className={`overflow-hidden whitespace-nowrap ${
                isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
              }`}
            >
              New Draft
            </span>
          </Button>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
          {drafts.map((draft, index) => (
            <div
              key={draft.id}
              id={`draft-item-${draft.id}`}
              onClick={() => {
                if (renamingDraftId !== draft.id) {
                  setActiveDraft(draft.id);
                }
              }}
              className={`group flex items-center p-2 rounded-md transition-colors duration-150 cursor-pointer ${
                draft.id === activeDraftId
                  ? 'bg-sky-100 text-sky-800 font-semibold'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
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
                    className={`flex items-center text-xs font-medium overflow-hidden ${isCollapsed ? '' : 'flex-grow'}`}
                    title={draft.title}
                  >
                    <span className="flex-shrink-0">
                      {index + 1}.
                    </span>
                    <span
                      style={{ transition: 'opacity 0.2s ease-in-out, max-width 0.2s ease-in-out, margin-left 0.2s ease-in-out' }}
                      className={`truncate ${
                        isCollapsed
                          ? 'max-w-0 opacity-0 ml-0'
                          : 'max-w-full opacity-100 ml-1'
                      }`}
                    >
                      {draft.title}
                    </span>
                  </div>

                  {!isCollapsed && (
                    <DraftActions
                      draft={draft}
                      isActive={draft.id === activeDraftId}
                      onRename={() => handleRenameStart(draft)}
                      onDelete={() => openDeleteModal(draft)}
                      className="flex-shrink-0"
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="p-2 text-xs text-center text-slate-500 border-t border-slate-200 sticky bottom-0 bg-white z-10 h-[37px] flex items-center justify-center">
          {drafts.length} draft{drafts.length === 1 ? '' : 's'}
        </div>
      </div>

      {draftToDelete && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title="Delete Draft"
          footer={(
            <>
              <Button 
                onClick={closeDeleteModal}
                variant="subtle"
                size="sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmDeleteDraft}
                variant="danger"
                size="sm"
              >
                Delete
              </Button>
            </>
          )}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-10 w-10 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-medium text-slate-700">
                Are you sure you want to delete the draft titled 
                <strong className="text-red-600"> &quot;{draftToDelete.title}&quot;</strong>?
              </p>
              <p className="mt-1 text-slate-500">
                This action cannot be undone. All content of this draft will be permanently lost.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
} 
 