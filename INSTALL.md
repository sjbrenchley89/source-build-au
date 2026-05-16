# Installation Guide

## Quick Install (All Packages)

Install all aggregated skill packages at once:

```bash
# Trading skills (54 skills)
npx skills add sjbrenchley89/claude-trading-skills

# Marketing skills (40+ skills)
npx skills add sjbrenchley89/marketingskills

# Engineering, product & leadership skills (270+ skills)
npx skills add sjbrenchley89/claude-skills1
```

## Per-Package Install

### Trading & Finance Skills

```bash
npx skills add sjbrenchley89/claude-trading-skills
```

Installs 54 skills covering:
- Technical analysis & chart patterns
- Market breadth & internals
- CANSLIM, VCP, and growth screening
- Earnings trade analysis
- Dividend investing SOPs
- Portfolio & position sizing
- Options strategies
- Edge development pipeline

### Marketing & Growth Skills

```bash
npx skills add sjbrenchley89/marketingskills
```

Installs 40+ skills covering:
- Copywriting & CRO
- SEO & AI SEO
- Paid ads & ad creative
- Email & cold outreach
- Social & video
- Referrals & growth loops
- Analytics & A/B testing

### Engineering & Business Skills

```bash
npx skills add sjbrenchley89/claude-skills1
```

Installs 270+ skills across 9 domains:
- Advanced engineering (71 skills)
- Core engineering (51 skills)
- Marketing (45 skills)
- C-level advisory (34 skills)
- Product management (17 skills)
- Regulatory/QMS (14 skills)
- Project management (9 skills)
- Business growth (5 skills)
- Finance (4 skills)

## Manual Installation

Clone the relevant repository into your project:

```bash
# Into your project's .skills/ directory
git clone https://github.com/sjbrenchley89/claude-trading-skills .skills/trading
git clone https://github.com/sjbrenchley89/marketingskills .skills/marketing
```

## Verification

After installation, verify skills are available in Claude Code:

```
/skills list
```

You should see skills from each installed package.

## Updates

Keep skills up to date:

```bash
npx skills update sjbrenchley89/claude-trading-skills
npx skills update sjbrenchley89/marketingskills
npx skills update sjbrenchley89/claude-skills1
```
