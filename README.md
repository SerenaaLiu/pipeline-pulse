# Pipeline Pulse

Pharma competitive intelligence tool for BD analysts.

Paste any drug company URL, pipeline page, or preprint.
Pipeline Pulse uses Exa's semantic search to surface hidden
competitors before the term sheet.

**Live:** https://pipeline-pulse-gamma.vercel.app

---

## Market: Pharma Business Development & Licensing

### The Problem

Biotech BD analysts spend 3–5 days manually synthesizing competitive
landscapes before every licensing decision. They query ClinicalTrials.gov,
patent databases, preprint servers, and international regulatory filings
separately — each with different vocabularies, no unified view, and no
semantic connection between them. The term sheet doesn't wait.

The core failure is linguistic. A competitor developing a "GLP-1 receptor
agonist" appears as "semaglutide analog" in one filing, "incretin mimetic"
in a preprint, and an entirely different string in a non-English regulatory
submission. Keyword search misses all of it. The analyst misses the
competitor. The deal closes on incomplete intelligence.

### What Challenges the BD Team Faces Today

BD analysts at mid-size biotechs are responsible for evaluating licensing
opportunities under tight timelines. Before any term sheet, they must produce
a complete competitive landscape — who else is working on this target, at
what stage, with what mechanism of action. That research currently requires
manually querying four or five separate databases with no shared vocabulary,
then synthesizing the results by hand. A process that should take minutes
takes days. And because the most important signals — preprints, conference
abstracts, international filings — are unstructured and uncurated, they
frequently get missed entirely.

### What the Product Needs

A single-query tool that traverses semantically related content across
sources simultaneously — finding competitors described as "GLP-1 receptor
agonist" in one source and "semaglutide analog" in another — and returns
actionable excerpts, not raw data dumps.

Beyond the core search layer, a BD-focused Exa integration would benefit
from date filtering to surface only preprints published in the last 12
months, category filtering scoped to `research paper` and `company` indexes,
and a monitoring feature that re-runs the same URL scan weekly — alerting
analysts when new competitors emerge during a live deal process.

### Why Vendors Ignore This Market

Incumbents like Citeline, Cortellis, and AlphaSense solved the structured
data problem — curated databases of registered trials, approved drugs, and
published filings. They assumed that was enough. It isn't.

The competitive intelligence that changes deal decisions lives in preprints,
conference abstracts, and international regulatory filings — unstructured,
uncurated, and invisible to keyword search. Vendors didn't ignore pharma.
They solved yesterday's problem and called it done.

### What Exa Uniquely Captures

Exa's `/findSimilar` endpoint finds semantically related content without
requiring vocabulary alignment. A BD analyst drops in a competitor's pipeline
URL and Exa surfaces related preprints, patents, and company pages that use
entirely different terminology for the same mechanism.

As licensing deals increasingly involve assets developed across multiple
regulatory jurisdictions, competitive signals appear in non-English sources
and filing systems that keyword-based databases structurally cannot index.
Exa's semantic search operates across languages, surfacing these signals in
the same query as English-language sources — something no structured database
can do architecturally.

This is not a feature gap. It is a structural one. You cannot bolt semantic
cross-language search onto a curated English-language database. Exa's moat
here is durable.

### The Market

$250B+ in pharma licensing deals closed in 2025 across 516 transactions,
with average deal size accelerating to $1.3B in early 2026. Every one of
those deals required a competitive landscape. BD teams currently produce that
landscape manually.

The addressable buyer is the BD analyst or competitive intelligence lead at
any biotech or pharma company actively evaluating licensing opportunities —
a population of tens of thousands globally, sitting inside organizations with
existing six-figure spend on inferior structured data tools.

### The Pilot

Run Pipeline Pulse live with a BD team during a real diligence sprint. Give
them one drug URL. Show them what surfaces in 10 seconds versus what their
current process finds in 3 days.

Success metric: did Exa surface a semantically related competitor, preprint,
or patent filing they had not previously identified? If yes in the first
session, the pilot converts. One prevented bad deal pays for years of
API spend.

### Sales Barriers and How to Overcome Them

**"We already have Citeline."**
Pipeline Pulse doesn't replace Citeline — it finds what Citeline
structurally cannot: the pre-publication and cross-language signal layer.
Lead with the gap, not the replacement narrative.

**"What about data compliance?"**
Pipeline Pulse uses only public web data. Zero PHI. Zero HIPAA exposure.
This is not a patient data product — it is a public intelligence synthesis
tool. That objection dissolves on contact with the actual use case.

**Procurement cycles.**
Don't sell to IT. Sell to the BD team lead or VP of Corporate Development
who has a deal on their desk and a Friday deadline. The pain is immediate
and the ROI calculation is trivial.

### Why This Is Compelling for Exa

Pharma BD is a high-value, high-urgency buyer with existing six-figure spend
on inferior tools, a pain point that maps precisely to Exa's structural
advantage, and a use case where the ROI of one good result is immediate and
quantifiable. It is not a market Exa needs to educate — it is a market
waiting to be told that a better tool exists.

---

## The Applet

Pipeline Pulse demonstrates the core value proposition directly. Paste any
drug company URL, preprint, or pipeline page. Exa's `/findSimilar` endpoint
returns semantically related competitors — not keyword matches, not
backlinks, but conceptual neighbors across the web — with mechanism-of-action
excerpts surfaced via `highlights`.

The demo is the argument.

---

## Stack
- Next.js 14
- Exa JavaScript SDK
- Tailwind CSS
- Vercel
