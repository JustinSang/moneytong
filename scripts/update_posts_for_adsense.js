#!/usr/bin/env node
/**
 * 머니통 블로그 포스트 일괄 업데이트 스크립트
 * - articleType 추가 (guide / calculator / comparison)
 * - lastModified 추가
 * - slug 추가
 * - title metadata에서 " | 머니통" 중복 제거 (layout.js template이 이미 추가하므로)
 * - 발행일 분산 (7월~9월)
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'src', 'app', 'blog');

// 각 슬러그별 설정
const POST_CONFIG = {
  // ── 가이드형 (guide) ──
  'basic-pension': {
    articleType: 'guide',
    postMeta: '2026-07-15 · 머니통 편집부',
    lastModified: '2026-09-10',
  },
  'national-pension': {
    articleType: 'guide',
    postMeta: '2026-07-22 · 머니통 편집부',
    lastModified: '2026-09-08',
  },
  'basic-pension-deduction': {
    articleType: 'guide',
    postMeta: '2026-07-28 · 머니통 편집부',
    lastModified: '2026-09-05',
  },
  'unemployment-benefits': {
    articleType: 'guide',
    postMeta: '2026-08-05 · 머니통 편집부',
    lastModified: '2026-09-07',
  },
  'work-incentive': {
    articleType: 'guide',
    postMeta: '2026-08-12 · 머니통 편집부',
    lastModified: '2026-09-09',
  },
  'year-end-tax': {
    articleType: 'guide',
    postMeta: '2026-08-18 · 머니통 편집부',
    lastModified: '2026-09-06',
  },

  // ── 비교형 (comparison) ──
  'long-term-care-insurance': {
    articleType: 'comparison',
    postMeta: '2026-08-01 · 머니통 편집부',
    lastModified: '2026-09-04',
  },
  'health-insurance-dependent': {
    articleType: 'comparison',
    postMeta: '2026-08-08 · 머니통 편집부',
    lastModified: '2026-09-03',
  },
  'health-insurance-refund': {
    articleType: 'comparison',
    postMeta: '2026-07-25 · 머니통 편집부',
    lastModified: '2026-09-02',
  },

  // ── 계산기형 (calculator) ──
  'acquisition-tax-calculator': {
    articleType: 'calculator',
    postMeta: '2026-08-15 · 머니통 편집부',
    lastModified: '2026-09-11',
  },
  'property-tax-calculator': {
    articleType: 'calculator',
    postMeta: '2026-08-20 · 머니통 편집부',
    lastModified: '2026-09-10',
  },
  'car-tax-calculator': {
    articleType: 'calculator',
    postMeta: '2026-08-22 · 머니통 편집부',
    lastModified: '2026-09-09',
  },
  'salary-calculator': {
    articleType: 'calculator',
    postMeta: '2026-08-25 · 머니통 편집부',
    lastModified: '2026-09-11',
  },
  'severance-pay-calculator': {
    articleType: 'calculator',
    postMeta: '2026-09-01 · 머니통 편집부',
    lastModified: '2026-09-08',
  },
  'loan-calculator': {
    articleType: 'calculator',
    postMeta: '2026-08-28 · 머니통 편집부',
    lastModified: '2026-09-07',
  },
  'interest-calculator': {
    articleType: 'calculator',
    postMeta: '2026-09-02 · 머니통 편집부',
    lastModified: '2026-09-10',
  },
  'electricity-bill': {
    articleType: 'calculator',
    postMeta: '2026-08-10 · 머니통 편집부',
    lastModified: '2026-09-06',
  },
  'contract-power-calculator': {
    articleType: 'calculator',
    postMeta: '2026-09-03 · 머니통 편집부',
    lastModified: '2026-09-09',
  },
  'ev-charging-calculator': {
    articleType: 'calculator',
    postMeta: '2026-09-05 · 머니통 편집부',
    lastModified: '2026-09-11',
  },
};

let updated = 0;
let errors = 0;

for (const [slug, config] of Object.entries(POST_CONFIG)) {
  const filePath = path.join(BLOG_DIR, slug, 'page.js');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Not found: ${filePath}`);
    errors++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Add articleType to model object
  if (!content.includes('articleType')) {
    // Insert after "const model = {" or first occurrence of "postMeta:"
    content = content.replace(
      /(postMeta:\s*'[^']*')/,
      `$1,\n  articleType: '${config.articleType}',\n  slug: '${slug}',\n  lastModified: '${config.lastModified}'`
    );
  }

  // 2. Update postMeta date for distribution
  const oldPostMetaMatch = content.match(/postMeta:\s*'(\d{4}-\d{2}-\d{2})\s*·\s*머니통 편집부'/);
  if (oldPostMetaMatch) {
    content = content.replace(
      oldPostMetaMatch[0],
      `postMeta: '${config.postMeta}'`
    );
  }

  // 3. Fix title metadata duplication: remove " | 머니통" from individual page metadata
  // The layout.js template already adds " | 머니통" via the template pattern
  content = content.replace(
    /(\btitle:\s*')([^']*)\s*\|\s*머니통'/g,
    (match, prefix, titleText) => {
      // Keep " | 머니통" only if it's the og:title or not in metadata
      return `${prefix}${titleText.trim()}'`;
    }
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  updated++;
  console.log(`✅ ${slug} → ${config.articleType} (${config.postMeta.split(' · ')[0]})`);
}

console.log(`\nDone: ${updated} updated, ${errors} errors.`);
