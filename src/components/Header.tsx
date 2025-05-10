import React from 'react';
import ExportMenu from './ExportMenu';

interface HeaderProps {
  title: string;
  isExportMenuOpen: boolean;
  onExportMenuToggle: () => void;
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onCopyRichText: () => void;
  onShareViaLink: () => void;
  shareLinkStatus: null | 'copied' | 'failed';
  exportMenuRef: React.RefObject<HTMLDivElement | null>;
}

export default function Header({
  title,
  isExportMenuOpen,
  onExportMenuToggle,
  onExportMarkdown,
  onExportHtml,
  onCopyRichText,
  onShareViaLink,
  shareLinkStatus,
  exportMenuRef
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-3 border-b border-slate-200 bg-white h-[57px]">
      <h1 className="text-lg font-semibold text-text truncate" title={title}>
        {title}
      </h1>
      <ExportMenu
        isOpen={isExportMenuOpen}
        onToggle={onExportMenuToggle}
        onExportMarkdown={onExportMarkdown}
        onExportHtml={onExportHtml}
        onCopyRichText={onCopyRichText}
        onShareViaLink={onShareViaLink}
        shareLinkStatus={shareLinkStatus}
        menuRef={exportMenuRef}
      />
    </header>
  );
} 
