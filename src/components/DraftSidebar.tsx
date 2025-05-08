'use client';

import { useMarkdownStore, Draft } from '@/store/useMarkdownStore';
import { PlusCircle, Trash2, Edit3, FileText, Check, X, AlertTriangle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';

export default function DraftSidebar() {
  const {
    drafts,
    activeDraftId,
    setActiveDraft,
    createDraft,
    deleteDraft,
    updateActiveDraftTitle,
  } = useMarkdownStore();

  const [renamingDraftId, setRenamingDraftId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<Draft | null>(null);

  const handleRenameStart = (draft: Draft) => {
    setRenamingDraftId(draft.id);
    setTempTitle(draft.title);
  };

  useEffect(() => {
    if (renamingDraftId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingDraftId]);

  const handleRenameConfirm = () => {
    console.log('[DraftSidebar] handleRenameConfirm called', { renamingDraftId, tempTitle });
    if (renamingDraftId && tempTitle.trim() !== '') {
      console.log('[DraftSidebar] Calling updateActiveDraftTitle');
      updateActiveDraftTitle(renamingDraftId, tempTitle.trim());
    } else {
      console.log('[DraftSidebar] Rename conditions not met or title empty');
    }
    setRenamingDraftId(null);
    setTempTitle('');
  };

  const handleRenameCancel = () => {
    console.log('[DraftSidebar] handleRenameCancel called');
    setRenamingDraftId(null);
    setTempTitle('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };
  
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('[DraftSidebar] Enter key pressed in rename input');
      e.preventDefault();
      handleRenameConfirm();
    } else if (e.key === 'Escape') {
      console.log('[DraftSidebar] Escape key pressed in rename input');
      handleRenameCancel();
    }
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
      <div className="w-72 h-full bg-slate-100 border-r border-slate-200 flex flex-col flex-shrink-0 select-none">
        <div className="p-3 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-slate-100 z-10 h-[57px]">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">Drafts</h2>
          <button
            onClick={createDraft}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-200 rounded-md transition-colors duration-150"
            title="Create New Draft"
          >
            <PlusCircle size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pt-1 pb-2">
          {drafts.length === 0 && (
            <div className="p-4 mt-4 text-xs text-center text-slate-400 flex flex-col items-center">
              <FileText size={32} className="mb-2 opacity-60"/>
              <p className="font-medium text-slate-500">No drafts yet</p>
              <p>Click the &apos;+&apos; to create one.</p>
            </div>
          )}
          <ul className="px-1.5 py-1">
            {drafts.map((draft) => (
              <li key={draft.id} className="mb-0.5">
                <div
                  onClick={() => renamingDraftId !== draft.id && setActiveDraft(draft.id)}
                  className={`group flex items-center justify-between p-2 rounded-md transition-all duration-150 
                              ${draft.id === activeDraftId 
                                ? 'bg-slate-200 text-slate-700 font-semibold'
                                : 'text-slate-600 hover:bg-slate-200 hover:text-slate-800 cursor-pointer'}
                          `}
                >
                  {renamingDraftId === draft.id ? (
                    <div className="flex-grow flex items-center gap-1">
                      <input 
                        ref={renameInputRef}
                        type="text"
                        value={tempTitle}
                        onChange={handleTitleChange}
                        onBlur={handleRenameConfirm}
                        onKeyDown={handleTitleKeyDown}
                        className="flex-grow bg-white text-xs p-1 border border-blue-400 rounded-sm focus:outline-none ring-1 ring-blue-500 text-slate-800 h-6"
                      />
                      <button onClick={handleRenameConfirm} className="p-1 text-green-600 hover:bg-green-100 rounded-sm"><Check size={14}/></button>
                      <button onClick={handleRenameCancel} className="p-1 text-red-500 hover:bg-red-100 rounded-sm"><X size={14}/></button>
                    </div>
                  ) : (
                    <span className={`flex-grow truncate text-xs font-medium ${draft.id === activeDraftId ? 'text-slate-800' : 'text-slate-700 group-hover:text-slate-900'}`} title={draft.title}>
                      {draft.title}
                    </span>
                  )}
                  {renamingDraftId !== draft.id && (
                    <div className={`flex items-center space-x-0.5 ml-2 flex-shrink-0 
                                    ${draft.id === activeDraftId ? 'opacity-90' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-150'}
                                  `}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRenameStart(draft); }} 
                        className={`p-1 rounded-sm ${draft.id === activeDraftId ? 'text-slate-500 hover:text-blue-600 hover:bg-slate-300/70' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-200'}`}
                        title="Rename Draft"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(draft);
                        }}
                        className={`p-1 rounded-sm ${draft.id === activeDraftId ? 'text-slate-500 hover:text-red-600 hover:bg-slate-300/70' : 'text-slate-400 hover:text-red-500 hover:bg-slate-200'}`}
                        title="Delete Draft"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2 text-xs text-center text-slate-500 border-t border-slate-200 sticky bottom-0 bg-slate-100 z-10 h-[37px] flex items-center justify-center">
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
              <button 
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteDraft}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition-colors"
              >
                Delete
              </button>
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
