# source-build-au

A Claude Code skill aggregation repository that imports and organizes skills from multiple upstream skill packages.

## Imported Skill Sources

| Package | Source | Domain |
|---------|--------|--------|
| `claude-trading-skills` | [sjbrenchley89/claude-trading-skills](https://github.com/sjbrenchley89/claude-trading-skills) | Trading & Finance |
| `marketingskills` | [sjbrenchley89/marketingskills](https://github.com/sjbrenchley89/marketingskills) | Marketing & Growth |
| `claude-skills1` | [sjbrenchley89/claude-skills1](https://github.com/sjbrenchley89/claude-skills1) | Engineering, Product, Leadership |

## Structure

```
source-build-au/
├── skills/
│   ├── trading/          # Trading & finance skills
│   └── marketing/        # Marketing & growth skills
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
└── README.md
```

## Installation

Install all skills via the Claude Code plugin system:

```bash
npx skills add sjbrenchley89/source-build-au
```

Or install individual packages:

```bash
# Trading skills
npx skills add sjbrenchley89/claude-trading-skills

# Marketing skills
npx skills add sjbrenchley89/marketingskills

# Full engineering + business skills
npx skills add sjbrenchley89/claude-skills1
```

## Skills Overview

### Trading (54 skills)
Technical analysis, market breadth, sector rotation, earnings plays, dividend screening, backtesting, portfolio management, and more.

### Marketing (40+ skills)
Copywriting, CRO, SEO, paid ads, email, social, video, pricing, referrals, analytics, and more.

## License

MIT
