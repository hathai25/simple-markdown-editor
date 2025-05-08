import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Draft {
  id: string;
  title: string;
  content: string;
  lastModified: number; // Timestamp
}

interface MarkdownStoreState {
  drafts: Draft[];
  activeDraftId: string | null;
  createDraft: () => void;
  setActiveDraft: (id: string) => void;
  updateActiveDraftContent: (content: string) => void;
  updateActiveDraftTitle: (id: string, title: string) => void;
  deleteDraft: (id: string) => void;
  getDraftById: (id: string) => Draft | undefined;
  getActiveDraft: () => Draft | undefined;
}

const initialDraftId = uuidv4();
const initialDraft: Draft = {
  id: initialDraftId,
  title: 'Untitled Draft',
  content: '# Hello, Markdown!\n\nStart typing your new draft here.',
  lastModified: Date.now(),
};

export const useMarkdownStore = create<MarkdownStoreState>()(
  persist(
    (set, get) => ({
      drafts: [initialDraft],
      activeDraftId: initialDraftId,

      createDraft: () => {
        const newDraftId = uuidv4();
        const newDraft: Draft = {
          id: newDraftId,
          title: 'Untitled Draft',
          content: '# New Draft\n\nStart writing...',
          lastModified: Date.now(),
        };
        set((state) => ({
          drafts: [newDraft, ...state.drafts],
          activeDraftId: newDraftId,
        }));
      },

      setActiveDraft: (id) => {
        set({ activeDraftId: id });
      },

      updateActiveDraftContent: (content) => {
        set((state) => {
          const activeId = get().activeDraftId;
          if (!activeId) return {};
          return {
            drafts: state.drafts.map((draft) =>
              draft.id === activeId
                ? { ...draft, content, lastModified: Date.now() }
                : draft
            ),
          };
        });
      },
      
      updateActiveDraftTitle: (id, title) => {
        console.log('[Store] updateActiveDraftTitle called', { id, title });
        set((state) => {
          console.log('[Store] Current drafts before map:', JSON.stringify(state.drafts));
          const newDrafts = state.drafts.map((draft) =>
            draft.id === id ? { ...draft, title: title, lastModified: Date.now() } : draft // Ensure title is explicitly passed
          );
          console.log('[Store] New drafts after map:', JSON.stringify(newDrafts));
          if (JSON.stringify(state.drafts) === JSON.stringify(newDrafts)) {
             console.warn('[Store] Warning: drafts array seems unchanged after map!');
          }
          return { drafts: newDrafts };
        });
        // Log state immediately after set using get()
        const updatedDraft = get().drafts.find(d => d.id === id);
        console.log('[Store] State after set (via get): Draft found? ', !!updatedDraft, ' Title:', updatedDraft?.title);
      },

      deleteDraft: (id) => {
        set((state) => {
          const remainingDrafts = state.drafts.filter((draft) => draft.id !== id);
          let newActiveDraftId = state.activeDraftId;

          if (state.activeDraftId === id) {
            if (remainingDrafts.length > 0) {
              newActiveDraftId = remainingDrafts.sort((a,b) => b.lastModified - a.lastModified)[0].id;
            } else {
              const newDraftId = uuidv4();
              const newFallbackDraft: Draft = {
                id: newDraftId,
                title: 'Untitled Draft',
                content: '# Welcome Back!\n\nAll drafts were deleted. This is a new one.',
                lastModified: Date.now(),
              };
              remainingDrafts.push(newFallbackDraft);
              newActiveDraftId = newDraftId;
            }
          }
          return {
            drafts: remainingDrafts,
            activeDraftId: newActiveDraftId,
          };
        });
      },
      
      getDraftById: (id) => {
        return get().drafts.find(draft => draft.id === id);
      },

      getActiveDraft: () => {
        const activeId = get().activeDraftId;
        if (!activeId) return undefined;
        return get().drafts.find(draft => draft.id === activeId);
      },
    }),
    {
      name: 'markdown-editor-storage', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        drafts: state.drafts, 
        activeDraftId: state.activeDraftId, 
      }),
    }
  )
);

export const getDraftTitle = (content: string): string => {
  const firstLine = content.split('\n')[0].trim();
  if (firstLine.startsWith('# ')) {
    return firstLine.substring(2).trim() || 'Untitled';
  }
  if (firstLine.startsWith('## ')) {
    return firstLine.substring(3).trim() || 'Untitled';
  }
  if (firstLine.startsWith('### ')) {
    return firstLine.substring(4).trim() || 'Untitled';
  }
  const plainTitle = firstLine.replace(/[#*-_=]/g, '').trim();
  return plainTitle.substring(0, 40) || 'Untitled';
};
