import React from 'react';
import { Download, FileCode, ClipboardCopy, Link, Check, X, ChevronDown, Share2 } from 'lucide-react';
import Button from './Button';

interface ExportMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onCopyRichText: () => void;
  onShareViaLink: () => void;
  shareLinkStatus: null | 'copied' | 'failed';
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export default function ExportMenu({
  isOpen,
  onToggle,
  onExportMarkdown,
  onExportHtml,
  onCopyRichText,
  onShareViaLink,
  shareLinkStatus,
  menuRef
}: ExportMenuProps) {
  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={onToggle}
        variant="default"
        size="xs"
        title="Export & Share"
        aria-expanded={isOpen}
        aria-haspopup="true"
        icon={<Share2 size={14} />}
      >
        <span>Export & Share</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''} ml-1.5 text-slate-400`} />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100%+1px)] bg-white rounded-md shadow-lg border border-slate-200 py-1 z-10 focus:outline-none">
          <Button
            onClick={onExportMarkdown}
            variant="ghost"
            size="xs"
            className="w-full justify-start text-slate-700 hover:text-slate-900"
            icon={<Download size={14} className="text-slate-400" />}
          >
            Download .md
          </Button>
          <Button
            onClick={onExportHtml}
            variant="ghost"
            size="xs"
            className="w-full justify-start text-slate-700 hover:text-slate-900"
            icon={<FileCode size={14} className="text-slate-400" />}
          >
            Download .html
          </Button>
          <Button
            onClick={onCopyRichText}
            variant="ghost"
            size="xs"
            className="w-full justify-start text-slate-700 hover:text-slate-900"
            icon={<ClipboardCopy size={14} className="text-slate-400" />}
          >
            Copy Rich Text
          </Button>
          <div className="my-1 border-t border-slate-100"></div>
          <Button
            onClick={onShareViaLink}
            variant="ghost"
            size="xs"
            className="w-full justify-start text-slate-700 hover:text-slate-900 disabled:opacity-50"
            disabled={shareLinkStatus === 'copied'}
            icon={
              shareLinkStatus === 'copied' ? <Check size={14} className="text-green-500" /> :
              shareLinkStatus === 'failed' ? <X size={14} className="text-red-500" /> :
              <Link size={14} className="text-slate-400" />
            }
          >
            {shareLinkStatus === 'copied' ? 'Copied!' : shareLinkStatus === 'failed' ? 'Failed!' : 'Share via link'}
          </Button>
        </div>
      )}
    </div>
  );
} 
