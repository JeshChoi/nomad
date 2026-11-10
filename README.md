# Nomad
Learn wherever life takes you.

An initial Next.js / PostgreSQL implementation of the Nomad specification. **This is a partial MVP, not a completed or production-ready implementation.**

## Setup
Requires Node.js 22+ and Docker with Compose.

```sh
npm install
cp .env.example .env
docker compose up -d
npm run db:migrate
npm run dev
```

Open http://localhost:3000 and create an account with a 12-character password. Paste notes at Import, extract suggestions, approve individual objectives in Library, then start a session. Use Speak prompt for browser text-to-speech and type answers. End the session to inspect its stored transcript and assessment evidence.

Optional seed (sets up an account and source notes; no mastery or approval is seeded):

```sh
SEED_EMAIL=pilot@example.com SEED_PASSWORD='choose-a-long-password' npm run db:seed
```

## Configuration
`DATABASE_URL` is required. `APP_ORIGIN` must match the browser origin. `DEMO_MODE=true` explicitly selects deterministic extraction and canned tutoring. Demo never grades learner answers or raises mastery. Set it to `false` and provide server-only `OPENAI_API_KEY` for live assessment. `LLM_BASE_URL` and `LLM_MODEL` configure an OpenAI-compatible chat-completions endpoint. No provider keys are sent to the browser. `.env.example` lists defaults. Token output is currently capped at 1800 in code.

## Implemented
Email/password authentication with hashed passwords and hashed opaque session tokens; per-user source/session access checks; text imports; exact-substring provenance checks; explicit objective approval; persisted sessions/transcripts; conservative assessment evidence guards; transactional assessment/review writes; idempotency keys on turn requests; session summaries derived from recorded events; source and API session deletion. Browser speech synthesis and typed input. PostgreSQL migration and optional seed.

The deterministic scheduler schedules AGAIN tomorrow and resets repetitions, HARD in two days, GOOD at 1/3/7/14 days then doubles, EASY at at least four days then triples. This is a simple SM-2-inspired heuristic, not scientifically optimal personalization. Passive listening produces no evidence.

## Validation
```sh
npm run typecheck
npm run lint
npm test
npm run build
```
Scheduler tests cover reset, successful recall intervals, and UTC dates. Database and browser acceptance tests have not been completed.

## Outstanding work and known limitations
PDF upload/extraction, speech recognition, PWA manifest/service worker, screen wake lock, rate limits, richer curriculum rename/merge/delete, per-subject session selection, intent-specific selection, timed session completion, pending suggestions, append-only assessment corrections/replay, objective history endpoint, AI retries, and full mocked integration/E2E tests remain to be implemented. The configured duration and style are stored but do not yet control the session. Skip/next prompt selection is basic and not yet durable. The current client generates a fresh idempotency key on a manual retry, so lost responses need better client recovery. Source deletion cascades associated evidence; review state after session deletion is not rebuilt. Concurrent distinct turns need stronger sequencing. Errors need production sanitization. The ease factor is stored but not adapted. Do not deploy publicly until these gaps are addressed.

Browser speech requires user activation and varies by browser. No reliable locked-screen/background playback is promised. Configure sessions before driving; do not interact with the screen while driving. Reliable hands-free driving support requires microphone turn-taking and testing first; uninterrupted background audio requires native mobile audio sessions and platform lifecycle handling.
