import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/app/blog');

function extractData(content, slug) {
  let title = '';
  let category = '';
  let summaryText = '';

  // Try to match the model object first
  const modelMatch = content.match(/const\s+model\s*=\s*(\{[\s\S]*?\});/);
  if (modelMatch) {
    const modelText = modelMatch[1];
    const titleMatch = modelText.match(/title:\s*['"](.*?)['"]/);
    title = titleMatch ? titleMatch[1] : '';
    
    const tagMatch = modelText.match(/tag:\s*['"](.*?)['"]/);
    category = tagMatch ? tagMatch[1] : '';
    
    const summaryMatch = modelText.match(/items:\s*\[([\s\S]*?)\]/);
    if (summaryMatch) {
      const itemsRaw = summaryMatch[1];
      const items = [...itemsRaw.matchAll(/['"](.*?)['"]/g)].map(m => m[1]);
      summaryText = items.join(' ');
    }
  } else {
    // Fallback for older JSX articles (e.g. work-incentive, sweet-potato-pilot)
    const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i) || content.match(/title:\s*['"](.*?)['"]/);
    title = titleMatch ? titleMatch[1] : '';
    
    const tagMatch = content.match(/<span className="tag">(.*?)<\/span>/);
    category = tagMatch ? tagMatch[1] : '';
    
    const descMatch = content.match(/description:\s*['"](.*?)['"]/);
    summaryText = descMatch ? descMatch[1] : '';
  }
  
  // Extract numbers for deterministic check
  const numbers = [...summaryText.matchAll(/\d[\d,.%억만원]*/g)].map(m => m[0]);
  
  return {
    slug,
    category,
    title,
    summaryNumbers: numbers.join(', ')
  };
}

function main() {
  const folders = fs.readdirSync(BLOG_DIR).filter(f => fs.statSync(path.join(BLOG_DIR, f)).isDirectory());
  
  let markdownTable = '### 머니통 Phase 1 파싱 검수용 덤프\n';
  markdownTable += '| Slug | Category | Title | Summary Numbers |\n';
  markdownTable += '|---|---|---|---|\n';
  
  for (const slug of folders) {
    let pagePath = path.join(BLOG_DIR, slug, 'page.js');
    if (!fs.existsSync(pagePath)) {
      pagePath = path.join(BLOG_DIR, slug, 'page.tsx');
    }
    if (!fs.existsSync(pagePath)) continue;

    const content = fs.readFileSync(pagePath, 'utf8');
    const data = extractData(content, slug);
    if (data) {
      markdownTable += `| ${data.slug} | ${data.category} | ${data.title.replace(/\|/g, "")} | ${data.summaryNumbers} |\n`;
    } else {
      markdownTable += `| ${slug} | ERROR | Failed to parse | - |\n`;
    }
  }
  console.log(markdownTable);
}

main();
