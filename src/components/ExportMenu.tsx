import React from 'react';
import { Download, FileCode, ClipboardCopy, Link, Check, X, ChevronDown, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportMenuProps {
  onExportMarkdown: () => void;
  onExportHtml: () => void;
  onCopyRichText: () => void;
  onShareViaLink: () => void;
  shareLinkStatus: null | 'copied' | 'failed';
}

export default function ExportMenu({
  onExportMarkdown,
  onExportHtml,
  onCopyRichText,
  onShareViaLink,
  shareLinkStatus,
}: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          title="Export & Share"
          className="text-muted-foreground hover:text-primary"
        >
          <Share2 size={14} className="mr-1.5" />
          <span>Export & Share</span>
          <ChevronDown size={12} className={`ml-1.5`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={onExportMarkdown}>
          <Download size={14} className="mr-2 text-text-light dark:text-text-dark-light" />
          <span>Download .md</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportHtml}>
          <FileCode size={14} className="mr-2 text-text-light dark:text-text-dark-light" />
          <span>Download .html</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyRichText}>
          <ClipboardCopy size={14} className="mr-2 text-text-light dark:text-text-dark-light" />
          <span>Copy Rich Text</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onShareViaLink} 
          disabled={shareLinkStatus === 'copied'}
        >
          {shareLinkStatus === 'copied' ? <Check size={14} className="mr-2 text-success" /> :
           shareLinkStatus === 'failed' ? <X size={14} className="mr-2 text-error" /> :
           <Link size={14} className="mr-2 text-text-light dark:text-text-dark-light" />}
          <span>{shareLinkStatus === 'copied' ? 'Copied!' : shareLinkStatus === 'failed' ? 'Failed!' : 'Share via link'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 
