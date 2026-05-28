import { createClient } from "@supabase/supabase-js";

const sbUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const sbAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const SUPABASE_READY =
  sbUrl.startsWith("https://") && !sbUrl.includes("placeholder") && sbAnon.length > 20;

export const supabase = createClient(
  SUPABASE_READY ? sbUrl : "https://placeholder.supabase.co",
  SUPABASE_READY ? sbAnon : "placeholder",
  { auth: { persistSession: false } },
);

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
}

function normalize(row: Record<string, unknown>): Post {
  return {
    id:         String(row.id ?? ""),
    slug:       String(row.slug ?? ""),
    title:      String(row.title ?? ""),
    excerpt:    String(row.excerpt ?? ""),
    content:    String(row.content ?? ""),
    image:      String(row.cover_image ?? ""),
    category:   String(row.category ?? ""),
    date:       row.created_at
      ? new Date(String(row.created_at)).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })
      : "",
    readTime:   String(row.read_time ?? "5 min"),
    author:     String(row.author ?? "Redacción"),
    authorRole: "Impulso Sinaloa",
  };
}

export async function fetchPosts(): Promise<Post[]> {
  if (!SUPABASE_READY) return [];
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("site", "impulso-sinaloa")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) { console.warn("[impulso] fetch error:", error.message); return []; }
  return (data ?? []).map(normalize);
}

export async function fetchPost(slug: string): Promise<Post | null> {
  if (!SUPABASE_READY) return null;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("site", "impulso-sinaloa")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  if (error) return null;
  return normalize(data);
}
