import Exa from "exa-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type SimilarRequestBody = {
  url?: string;
};

function parseHttpUrl(value: string): URL | null {
  try {
    const u = new URL(value);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfigured: EXA_API_KEY is not set." },
      { status: 500 },
    );
  }

  let body: SimilarRequestBody;
  try {
    body = (await req.json()) as SimilarRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rawUrl = body.url?.trim();
  if (!rawUrl) {
    return NextResponse.json(
      { error: "Please paste a valid URL (e.g. https://...)" },
      { status: 400 },
    );
  }

  const parsed = parseHttpUrl(rawUrl);
  if (!parsed) {
    return NextResponse.json(
      { error: "Please paste a valid URL (e.g. https://...)" },
      { status: 400 },
    );
  }

  const hostname = parsed.hostname;
  const exa = new Exa(apiKey);

  try {
    const result = await exa.findSimilar(parsed.toString(), {
      numResults: 8,
      excludeDomains: [hostname],
      contents: {
        text: true,
        highlights: {
          maxCharacters: 4000,
          query: "mechanism of action clinical trial phase competitor",
        },
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected error contacting Exa.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

