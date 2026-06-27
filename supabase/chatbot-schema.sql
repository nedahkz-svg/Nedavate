-- Nedavate chatbot schema. Run this in the Supabase SQL editor (no migrations
-- folder/CLI is used in this repo). Safe to re-run: uses `create extension if
-- not exists` / `create or replace function`, but the `create table`
-- statements will error if the tables already exist — drop them first if
-- you need to re-apply during development.

create extension if not exists vector;

-- ── Knowledge base chunks (RAG) ─────────────────────────────────────────────
create table kb_chunks (
  id bigint generated always as identity primary key,
  source text not null,
  content text not null,
  metadata jsonb not null default '{}',
  embedding vector(768) not null, -- 768 = Gemini gemini-embedding-001, truncated via outputDimensionality
  created_at timestamptz not null default now()
);

-- Requires pgvector >= 0.5.0 for HNSW. If this errors on your project, use
-- `using ivfflat (embedding vector_cosine_ops) with (lists = 100)` instead.
create index kb_chunks_embedding_idx
  on kb_chunks using hnsw (embedding vector_cosine_ops);

create or replace function match_kb_chunks(
  query_embedding vector(768),
  match_count int default 5,
  match_threshold float default 0.5
)
returns table (id bigint, source text, content text, metadata jsonb, similarity float)
language sql stable as $$
  select id, source, content, metadata, 1 - (embedding <=> query_embedding) as similarity
  from kb_chunks
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- ── Visitor identity (anonymous-first, upgrades to email on capture_lead) ──
create table visitors (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  channel text not null,
  telegram_chat_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Long-term memory: durable facts per visitor ─────────────────────────────
create table visitor_memory (
  visitor_id uuid primary key references visitors(id) on delete cascade,
  summary text not null default '',
  facts jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- ── Short-term memory: conversation turns ───────────────────────────────────
create table conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references visitors(id) on delete cascade,
  channel text not null,
  created_at timestamptz not null default now()
);

create table chat_messages (
  id bigint generated always as identity primary key,
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null,
  content text not null,
  tool_name text,
  created_at timestamptz not null default now()
);
create index chat_messages_conversation_idx on chat_messages (conversation_id, created_at);

-- ── update_registration tool stub (placeholder, NOT a real system) ────────
create table registration_requests (
  id bigint generated always as identity primary key,
  visitor_id uuid references visitors(id) on delete set null,
  raw_args jsonb not null,
  status text not null default 'received',
  created_at timestamptz not null default now()
);
comment on table registration_requests is
  'PLACEHOLDER v1: stores raw tool-call payloads from update_registration. No real registration workflow exists yet — do not build features on top of this without redesigning.';

-- ── Lock all chatbot tables down to service-role only ──────────────────────
-- The public anon key (shipped to the browser for the existing lead form)
-- must not be able to read/write conversations, memory, or visitor emails.
-- No policies are added on purpose: RLS with zero policies denies anon/
-- authenticated entirely, while the service-role key (used by all chatbot
-- server code) bypasses RLS regardless.
alter table kb_chunks enable row level security;
alter table visitors enable row level security;
alter table visitor_memory enable row level security;
alter table conversations enable row level security;
alter table chat_messages enable row level security;
alter table registration_requests enable row level security;
