import React from 'react';
import ExportMenu from './ExportMenu';
import { ThemeToggle } from '../../components/theme-toggle';

interface HeaderProps {
  title: string;
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onCopyRichText: () => void;
  onShareViaLink: () => void;
  shareLinkStatus: null | 'copied' | 'failed';
}

export default function Header({
  title,
  onExportMarkdown,
  onExportHtml,
  onCopyRichText,
  onShareViaLink,
  shareLinkStatus,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-3 border-b border-border bg-card h-[57px]">
      <h1 className="text-lg font-semibold text-foreground truncate" title={title}>
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <ExportMenu
          onExportMarkdown={onExportMarkdown}
          onExportHtml={onExportHtml}
          onCopyRichText={onCopyRichText}
          onShareViaLink={onShareViaLink}
          shareLinkStatus={shareLinkStatus}
        />
        <ThemeToggle />
      </div>
    </header>
  );
} 
