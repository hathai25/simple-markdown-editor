import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewPaneProps {
  content: string;
}

export default function PreviewPane({ content }: PreviewPaneProps) {
  return (
    <div className="h-full overflow-y-auto bg-card border border-border shadow-sm p-4 sm:p-5 rounded-md [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb:hover]:block [&::-webkit-scrollbar-thumb:active]:block">
      <article className="markdown-content lg:prose-xl dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || ''}
        </ReactMarkdown>
      </article>
    </div>
  );
} 
