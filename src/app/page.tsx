"use client";

import { useMemo, useState } from "react";

type ExaResult = {
  id?: string;
  title?: string | null;
  url: string;
  publishedDate?: string | null;
  highlights?: string[] | null;
  text?: string | null;
};

type SimilarResponse =
  | { requestId?: string; results: ExaResult[] }
  | { error: string };

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatPublishedDate(value?: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function stripMarkdownHeadings(text: string): string {
  return (
    text
      // Remove lines that contain only hashes (e.g. "####")
      .replace(/^\s{0,3}#{1,6}\s*$/gm, "")
      // Strip markdown heading markers at the start of lines (e.g. "### Title")
      .replace(/^\s{0,3}#{1,6}\s+/gm, "")
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ExaResult[] | null>(null);

  const emptyState = useMemo(() => results === null && !loading, [results, loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResults(null);

    const trimmed = url.trim();
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        setError("Please paste a valid URL (e.g. https://...)");
        return;
      }
    } catch {
      setError("Please paste a valid URL (e.g. https://...)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/similar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = (await res.json()) as SimilarResponse;

      if (!res.ok || "error" in data) {
        setError("error" in data ? data.error : "Request failed.");
        return;
      }

      const seen = new Set<string>();
      const deduped = (data.results ?? []).filter((r) => {
        const title = (r?.title ?? "").trim();
        if (!title) return false;
        if (seen.has(title)) return false;
        seen.add(title);
        return true;
      });

      setResults(deduped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-gray-950 text-gray-100">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <header className="mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Pipeline Pulse
            </h1>
            <p className="text-sm text-gray-400">
              Find hidden competitors before the term sheet
            </p>
          </div>
        </header>

        <main className="space-y-10">
          <form onSubmit={onSubmit} className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Paste a drug or biotech URL to scan for competitors
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a drug or biotech URL to scan for competitors"
                className="w-full rounded-xl border border-gray-800 bg-gray-900/60 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500 outline-none ring-0 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                inputMode="url"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-gray-950 shadow-sm transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-gray-950/30 border-t-gray-950"
                      aria-hidden="true"
                    />
                    Scanning for competitors...
                  </span>
                ) : (
                  "Run Scan"
                )}
              </button>
            </div>

            {error ? (
              <p className="text-sm text-red-400">{error}</p>
            ) : emptyState ? (
              <p className="text-sm text-gray-500">
                Tip: try a pipeline page, a clinical trial listing, a preprint, or a
                patent filing URL.
              </p>
            ) : null}
          </form>

          {results ? (
            results.length === 0 ? (
              <div className="rounded-2xl border border-gray-800 bg-gray-900/30 p-6 text-sm text-gray-400">
                No results found. Try a different URL.
              </div>
            ) : (
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((r) => {
                  const domain = getDomain(r.url);
                  const published = formatPublishedDate(r.publishedDate);
                  const highlights = (r.highlights ?? []).filter(Boolean);
                  const firstHighlight = highlights.length
                    ? highlights[0].length > 400
                      ? `${highlights[0].slice(0, 400)}…`
                      : highlights[0]
                    : null;
                  const excerpt = !firstHighlight
                    ? r.text
                      ? r.text.length > 300
                        ? `${r.text.slice(0, 300)}…`
                        : `${r.text}…`
                      : null
                    : null;
                  const displaySnippet = firstHighlight
                    ? stripMarkdownHeadings(firstHighlight)
                    : excerpt
                      ? stripMarkdownHeadings(excerpt)
                      : null;

                  return (
                    <article
                      key={r.id ?? r.url}
                      className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/30 p-5"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500">{domain}</div>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 line-clamp-2 text-sm font-semibold text-white hover:text-emerald-200"
                          >
                            {r.title ?? r.url}
                          </a>
                          <div className="mt-1 text-xs text-gray-500">
                            {published ? `Published ${published}` : "Published date unavailable"}
                          </div>
                        </div>
                      </div>

                      {displaySnippet ? (
                        <blockquote className="line-clamp-6 border-l-2 border-emerald-400/80 bg-emerald-500/10 pl-3 text-xs italic leading-5 text-gray-100">
                          “{displaySnippet}”
                        </blockquote>
                      ) : (
                        <div className="text-xs text-gray-500">
                          No highlights available for this result.
                        </div>
                      )}
                    </article>
                  );
                })}
              </section>
            )
          ) : null}
        </main>
      </div>
    </div>
  );
}
