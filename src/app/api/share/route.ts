import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// In-memory store for shared drafts (for demonstration purposes)
// In a production app, replace this with a persistent database (e.g., Vercel KV, Supabase, etc.)
interface SharedDraftsStore {
  [id: string]: string; // id: markdownContent
}
const sharedDrafts: SharedDraftsStore = {};

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid content format. Content must be a string.' }, { status: 400 });
    }

    if (!content.trim()) {
      return NextResponse.json({ error: 'Content cannot be empty.' }, { status: 400 });
    }

    const id = uuidv4();
    sharedDrafts[id] = content;

    console.log(`[API /api/share] Created share with ID: ${id}`);
    // To see stored drafts for debugging: console.log(sharedDrafts);

    return NextResponse.json({ id }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('[API /api/share] Error creating share:', error);
    return NextResponse.json({ error: 'Failed to create share.' }, { status: 500 });
  }
}

// GET handler to retrieve shared content by ID
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing share ID.' }, { status: 400 });
  }

  const content = sharedDrafts[id];

  if (content === undefined) {
    return NextResponse.json({ error: 'Shared content not found.' }, { status: 404 });
  }

  console.log(`[API /api/share] Retrieved share with ID: ${id}`);
  return NextResponse.json({ id, content }, { status: 200 });
} 
