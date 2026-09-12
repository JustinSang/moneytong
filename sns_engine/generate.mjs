import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/app/blog');
const OUT_DIR = path.join(__dirname, 'output');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function extractData(content, slug) {
  let title = '';
  let category = '';
  let summaryItems = [];

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
      summaryItems = [...itemsRaw.matchAll(/['"](.*?)['"]/g)].map(m => m[1].replace(/<[^>]*>?/gm, ''));
    }
  } else {
    // Fallback for older JSX articles
    const titleMatch = content.match(/openGraph:\s*\{[\s\S]*?title:\s*['"](.*?)['"]/);
    if (titleMatch) {
      title = titleMatch[1];
    } else {
      const fallbackTitleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i) || content.match(/title:\s*['"](.*?)['"]/);
      title = fallbackTitleMatch ? fallbackTitleMatch[1] : '';
    }
    // Remove "| 머니통" if exists
    title = title.replace(/\s*\|\s*머니통\s*$/i, '');
    
    const tagMatch = content.match(/<span className="tag">(.*?)<\/span>/);
    category = tagMatch ? tagMatch[1] : '';
    
    const descMatch = content.match(/description:\s*['"](.*?)['"]/);
    if (descMatch) {
      summaryItems = [descMatch[1]];
    }
  }
  
  const summaryText = summaryItems.join(' ');
  const numbers = [...summaryText.matchAll(/\d[\d,.%억만원]*/g)].map(m => m[0]);
  
  return {
    slug,
    category,
    title,
    summaryItems,
    summaryNumbers: numbers
  };
}

function generateFallbackText(data) {
  const { title, category, summaryItems, slug } = data;
  const link = `https://moneytong.com/blog/${slug}`;
  const points = summaryItems.map((s, i) => `${i + 1}. ${s}`).join('\n');
  const checkPoints = summaryItems.map(s => `✅ ${s}`).join('\n');
  
  return {
    instagram: `🏠 ${title}\n\n【${category}】\n\n${checkPoints}\n\n자세한 내용은 👉 프로필 링크 확인!\n#머니통`,
    facebook: `【${category}】 ${title}\n\n${points}\n\n👉 무료 계산기/정보 확인: ${link}\n#머니통`,
    threads: `【${category}】 ${title}\n\n${summaryItems[0]}\n\n자세한 내용은 👉 ${link}\n#머니통`,
    x: `${title}\n${link}\n#머니통`
  };
}

async function callGemini(data) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const systemPrompt = `You are an expert SNS marketing content generator. 
CRITICAL RULE: You MUST ONLY use the facts, numbers, taxes, and rates provided in the source JSON. DO NOT invent, hallucinate, or generate any new numbers.
Your output must be a valid JSON object matching this schema:
{
  "hook": "String (an engaging short sentence based on title/summary)",
  "social_texts": {
    "instagram": "String (Title, hook, summary points with emojis, CTA to link, hashtags)",
    "facebook": "String (Title, hook, numbered summary, CTA link, 3 hashtags)",
    "threads": "String (conversational, under 500 chars, link, 2 hashtags)",
    "x": "String (under 280 chars, title, hook, link, 3 hashtags)"
  }
}`;

  const payload = JSON.stringify({
    title: data.title,
    category: data.category,
    summary: data.summaryItems
  });

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt + '\n\nSource JSON:\n' + payload }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  const resData = await res.json();
  if (resData.error) throw new Error(resData.error.message);
  
  const text = resData.candidates[0].content.parts[0].text;
  return JSON.parse(text);
}

function cardNewsHTML(data, hook) {
  const p = data;
  const slides = [
    `<section class="card cover"><span class="cat">${p.category}</span><h1>${p.title}</h1><p class="hook">${hook || p.title}</p><span class="brand">머니통 ₩</span></section>`,
    ...p.summaryItems.map((s, i) => `<section class="card"><span class="num">${i + 1}</span><p class="point">${s}</p><span class="brand">머니통 ₩</span></section>`),
    `<section class="card cta"><h2>지금 바로<br/>확인하세요</h2><p class="url">moneytong.com/blog/${p.slug}</p><span class="brand">머니통 ₩</span></section>`,
  ].join('\n');
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
    body{margin:0;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;background:#0e1420;display:flex;flex-wrap:wrap;gap:20px;padding:20px;}
    .card{width:432px;height:540px;border-radius:24px;padding:44px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;position:relative;
      background:linear-gradient(150deg,#1b5e9c,#2a7fc9 60%,#3fa7d6);color:#fff;box-shadow:0 12px 40px rgba(0,0,0,.4);}
    .card.cover{background:linear-gradient(150deg,#0f2f52,#1b5e9c);}
    .card.cta{background:linear-gradient(150deg,#2a7fc9,#3fa7d6);align-items:center;text-align:center;}
    .cat{display:inline-block;background:rgba(255,255,255,.2);padding:6px 14px;border-radius:999px;font-size:15px;font-weight:700;margin-bottom:18px;width:fit-content;}
    h1{font-size:34px;line-height:1.28;margin:0 0 16px;font-weight:800;word-break:keep-all;}
    .hook{font-size:19px;line-height:1.5;opacity:.92;margin:0;word-break:keep-all;}
    .num{font-size:60px;font-weight:900;opacity:.35;margin-bottom:8px;}
    .point{font-size:26px;line-height:1.45;font-weight:700;margin:0;word-break:keep-all;}
    h2{font-size:44px;line-height:1.2;margin:0 0 20px;font-weight:900;}
    .url{font-size:24px;font-weight:700;background:rgba(255,255,255,.2);padding:12px 22px;border-radius:12px;}
    .brand{position:absolute;bottom:28px;left:44px;font-size:16px;font-weight:800;opacity:.85;letter-spacing:.5px;}
    .card.cta .brand{left:50%;transform:translateX(-50%);}
  </style></head><body>${slides}</body></html>`;
}

async function main() {
  const folders = fs.readdirSync(BLOG_DIR).filter(f => fs.statSync(path.join(BLOG_DIR, f)).isDirectory());
  
  let totalCount = 0;
  let failCount = 0;

  for (const slug of folders) {
    let pagePath = path.join(BLOG_DIR, slug, 'page.js');
    if (!fs.existsSync(pagePath)) {
      pagePath = path.join(BLOG_DIR, slug, 'page.tsx');
    }
    if (!fs.existsSync(pagePath)) continue;

    const content = fs.readFileSync(pagePath, 'utf8');
    const data = extractData(content, slug);
    if (!data.title) continue;

    totalCount++;
    let textsToUse;
    let hookToUse = '';
    let isFallback = false;

    console.log(`[${slug}] Gemini 텍스트 생성 중... (원본 수치 ${data.summaryNumbers.length}개)`);
    try {
      const genData = await callGemini(data);
      hookToUse = genData.hook;
      
      // Deterministic Number Check
      const combinedGenText = Object.values(genData.social_texts).join(' ') + ' ' + hookToUse;
      const missingNumbers = data.summaryNumbers.filter(n => !combinedGenText.includes(n));
      
      if (missingNumbers.length > 0) {
        console.warn(`[${slug}] ❌ 결정론 대조 FAIL! 원본 수치 [${missingNumbers.join(', ')}] 누락. 템플릿으로 폴백합니다.`);
        textsToUse = generateFallbackText(data);
        hookToUse = data.title;
        isFallback = true;
        failCount++;
      } else {
        console.log(`[${slug}] ✅ 수치 결정론 대조 PASS.`);
        textsToUse = genData.social_texts;
      }
    } catch (err) {
      console.error(`[${slug}] ❌ API 에러 발생, 템플릿으로 폴백.`, err.message);
      textsToUse = generateFallbackText(data);
      hookToUse = data.title;
      isFallback = true;
      failCount++;
    }

    const snsText = [
      `═══ INSTAGRAM (${textsToUse.instagram.length}자) ═══\n${textsToUse.instagram}`,
      `═══ FACEBOOK (${textsToUse.facebook.length}자) ═══\n${textsToUse.facebook}`,
      `═══ THREADS (${textsToUse.threads.length}자) ═══\n${textsToUse.threads}`,
      `═══ X (${textsToUse.x.length}자) ═══\n${textsToUse.x}`,
      isFallback ? '\n[NOTE: 수치 대조 FAIL로 인해 템플릿 버전으로 생성되었습니다.]' : ''
    ].join('\n\n');

    fs.writeFileSync(path.join(OUT_DIR, `${slug}.sns.txt`), snsText);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.cards.html`), cardNewsHTML(data, hookToUse));
  }
  
  console.log(`\n================================`);
  console.log(`생성 완료: 총 ${totalCount}건 중 수치대조 FAIL(폴백) ${failCount}건`);
  console.log(`결과물 저장 경로: ${OUT_DIR}`);
}

main();
