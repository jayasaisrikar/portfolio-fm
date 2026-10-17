export const projects = [
  {
    "id": "fork",
    "title": "FORK",
    "description": "Governed agent execution: simulate competing decisions, approve one plan, and execute with a verifiable audit trail.",
    "fullDescription": "A generalizable agent harness that simulates LLM-proposed financial decisions against a frozen ledger snapshot. A human approves exactly one plan before deterministic execution. ArmorIQ signed intents and policy-checked MCP calls enforce ALLOW/HOLD/BLOCK decisions. SHA-256 plan binding, single-use capabilities, idempotency, and append-only double-entry postings guard against stale approvals and replay. Includes a decision studio, SSE execution timeline, and prompt-injection scenarios. Validated with 154 unit/integration, 14 Playwright, and 5 live ArmorIQ tests. Sandbox treasury, not real payments.",
    "tech": [
      "TypeScript",
      "Next.js",
      "Hono",
      "Drizzle",
      "SQLite",
      "MCP",
      "ArmorIQ"
    ],
    "demoLink": "https://fork-dun.vercel.app/",
    "repoLink": "https://github.com/jayasaisrikar/fork",
    "badge": "GOVERNED EXECUTION"
  },
  {
    "id": "crosswake",
    "title": "Crosswake",
    "description": "Live crypto market research, durable data infrastructure, causal backtests, and auditable paper signals.",
    "fullDescription": "A market-data, research, backtesting, and paper-signal platform with 24/7 processes, a live dashboard, and Telegram delivery. Durable trade/quote journals, checksum-verified imports, typed Parquet datasets, freshness checks, and deterministic replay keep research reproducible. Causal backtests use walk-forward selection, one-use holdouts, and fee/slippage/funding models. A Mastra AgentController harness coordinates permission-aware specialist agents with persistent sessions. Signals are recorded in an append-only SHA-256 hash-chained log. No live-money trading.",
    "tech": [
      "TypeScript",
      "Next.js",
      "Mastra",
      "Parquet",
      "Linux"
    ],
    "demoLink": "https://project-crosswake.vercel.app/",
    "repoLink": "https://github.com/jayasaisrikar/project-crosswake",
    "badge": "RESEARCH \u00b7 PAPER SIGNALS"
  },
  {
    "id": "quoril",
    "title": "Quoril",
    "description": "An offline-first productivity desktop app for tasks, focus sessions, activity analysis, and workspaces.",
    "fullDescription": "Co-founded and built a cross-platform productivity product for macOS and Windows. Quoril brings tasks, focus sessions, activity analysis, and workspaces into an offline-first desktop app with SQLite persistence and synchronization.",
    "tech": [
      "React",
      "Electron",
      "SQLite",
      "Sync"
    ],
    "demoLink": "https://quoril.in",
    "repoLink": null,
    "badge": "CO-FOUNDER"
  },
  {
    "id": "onchain-agent",
    "title": "On-Chain Analysis Agent",
    "description": "Multi-agent crypto research combining token detection, market data, web research, and structured synthesis.",
    "fullDescription": "An IQAI ADK sequential pipeline with shared session state for structured handoffs between token detection, real-time market data, web research, and synthesis. Integrates CoinGecko and Tavily tools. Winner of Best Collaboration / MCP Track at ADK-TS Hackathon 2025.",
    "tech": [
      "TypeScript",
      "IQAI ADK",
      "CoinGecko",
      "Tavily"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/on-chain-analysis-agent",
    "badge": "ADK-TS 2025 \u00b7 TRACK WINNER"
  },
  {
    "id": "stat-arb",
    "title": "Statistical Arbitrage",
    "description": "Market-neutral pairs research with rigorous out-of-sample validation and paper-trading ledgers.",
    "fullDescription": "A crypto pairs research engine using cointegration/ADF testing, multiple-testing control, Kalman-filter hedge ratios, and rolling z-scores. Walk-forward validation evaluates out-of-sample behavior. Includes scheduled asset screening, pair invalidation, paper-trading ledgers, protected REST/WebSocket endpoints, and asynchronous workers.",
    "tech": [
      "TypeScript",
      "Fastify",
      "TimescaleDB",
      "Redis",
      "BullMQ"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/stat-arb",
    "badge": "QUANT RESEARCH"
  },
  {
    "id": "code-architect",
    "title": "AI Code Architecture Agent",
    "description": "Multi-model repository analysis, architecture diagrams, and guidance on where new features belong.",
    "fullDescription": "A repository analysis tool with multi-model reasoning, architecture diagrams, and feature-placement guidance, built with FastAPI, React, and Mem0.",
    "tech": [
      "Python",
      "FastAPI",
      "React",
      "Mem0"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/spoc-agent",
    "badge": "DEVELOPER TOOLS"
  },
  {
    "id": "gridflex",
    "title": "GridFlex",
    "description": "Energy verification with versioned evidence and auditable proof chains.",
    "fullDescription": "An energy verification platform using versioned evidence, append-only provenance, canonical hashing, and auditable proof chains.",
    "tech": [
      "Evidence versioning",
      "Canonical hashing",
      "Provenance"
    ],
    "demoLink": null,
    "repoLink": "https://github.com/jayasaisrikar/gridflex",
    "badge": "ENERGY SYSTEMS"
  }
];
