import { config } from "dotenv";
config({ path: ".env.local" });

import {
  about,
  booking,
  hero,
  howIHelp,
  leadMagnet,
  projects,
  services,
  usp,
} from "../lib/content";

type Chunk = {
  source: string;
  content: string;
  metadata: Record<string, unknown>;
};

function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    source: "content.hero",
    content: `${hero.headline}\n${hero.subhead}\nUSP: ${usp.text}`,
    metadata: {},
  });

  for (const service of services) {
    chunks.push({
      source: "content.services",
      content: `${service.title}\n${service.description}\nTags: ${service.tags.join(", ")}`,
      metadata: { title: service.title },
    });
  }

  chunks.push({
    source: "content.howIHelp",
    content: `${howIHelp.heading}\n${howIHelp.intro}\n${howIHelp.steps
      .map((s) => `Step ${s.step} — ${s.title}: ${s.body}`)
      .join("\n")}`,
    metadata: {},
  });

  for (const project of projects) {
    chunks.push({
      source: "content.projects",
      content: `${project.title} (${project.client})\nProblem: ${project.problem}\nBuild: ${project.build}\nResult: ${project.result}\nTags: ${project.tags.join(", ")}`,
      metadata: { title: project.title },
    });
  }

  chunks.push({
    source: "content.about",
    content: `${about.heading}\n${about.lead}\n${about.body.join("\n")}\nHighlights: ${about.highlights.join(", ")}`,
    metadata: {},
  });

  chunks.push({
    source: "content.booking",
    content: `${booking.heading}\n${booking.intro}\nFree option — ${booking.free.name} (${booking.free.duration}, ${booking.free.price}): ${booking.free.description}\nPaid option — ${booking.paid.name} (${booking.paid.duration}, ${booking.paid.price}): ${booking.paid.description}`,
    metadata: {},
  });

  chunks.push({
    source: "content.leadMagnet",
    content: `${leadMagnet.heading}\n${leadMagnet.subhead}\n${leadMagnet.bullets.join("\n")}`,
    metadata: {},
  });

  return chunks;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, serviceRoleKey);

  const { embedText } = await import("../lib/chatbot/embeddings");

  const chunks = buildChunks();
  console.log(`Ingesting ${chunks.length} chunks...`);

  const sources = Array.from(new Set(chunks.map((c) => c.source)));
  for (const source of sources) {
    const { error } = await supabase.from("kb_chunks").delete().eq("source", source);
    if (error) console.error(`Failed clearing old chunks for ${source}:`, error.message);
  }

  let inserted = 0;
  for (const chunk of chunks) {
    const embedding = await embedText(chunk.content);
    const { error } = await supabase.from("kb_chunks").insert({
      source: chunk.source,
      content: chunk.content,
      metadata: chunk.metadata,
      embedding,
    });
    if (error) {
      console.error(`Failed inserting chunk (${chunk.source}):`, error.message);
    } else {
      inserted += 1;
    }
  }

  console.log(`Done. Inserted ${inserted}/${chunks.length} chunks.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
