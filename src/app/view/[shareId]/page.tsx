'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // To get route params
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Loader2, AlertTriangle, Home } from 'lucide-react'; // Icons
import Link from 'next/link'; // For linking back to home

export default function ShareViewPage() {
  const params = useParams();
  const shareId = params?.shareId as string | undefined;

  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('Shared Document');

  useEffect(() => {
    if (shareId) {
      setIsLoading(true);
      setError(null);
      fetch(`/api/share?id=${shareId}`)
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ error: `HTTP error! Status: ${res.status}` }));
            throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setContent(data.content);
          // Try to derive a title from the content, similar to how draft titles are made
          const firstLine = data.content.split('\n')[0].trim();
          if (firstLine.startsWith('# ')) {
            setTitle(firstLine.substring(2).trim() || 'Shared Document');
          } else {
            setTitle(firstLine.substring(0, 50) || 'Shared Document'); // Fallback to first 50 chars
          }
        })
        .catch((err) => {
          console.error("Failed to fetch shared content:", err);
          setError(err.message || 'Could not load shared document.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError('No Share ID provided.');
      setIsLoading(false);
    }
  }, [shareId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-3xl mb-6 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-700 truncate pr-4" title={title}>{title}</h1>
        <Link href="/" className="flex items-center text-sm text-blue-600 hover:text-blue-700 hover:underline">
          <Home size={16} className="mr-1.5" /> Back to Editor
        </Link>
      </header>

      <main className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-lg shadow-md border border-slate-200">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-slate-500 py-10">
            <Loader2 size={32} className="animate-spin mb-3" />
            <p>Loading shared document...</p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center text-red-600 bg-red-50 p-6 rounded-md border border-red-200">
            <AlertTriangle size={32} className="mb-3" />
            <p className="font-medium">Error loading document</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        {!isLoading && !error && content !== null && (
          <article className="markdown-content lg:prose-xl max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        )}
        {!isLoading && !error && content === null && (
            <div className="flex flex-col items-center justify-center text-slate-500 py-10">
                <AlertTriangle size={32} className="mb-3" />
                <p>Document content is empty or could not be loaded.</p>
            </div>
        )}
      </main>
      <footer className="w-full max-w-3xl mt-8 text-center text-xs text-slate-400">
        <p>Powered by Markdown Blog Editor</p>
      </footer>
    </div>
  );
} 
