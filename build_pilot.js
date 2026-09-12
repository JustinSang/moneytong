const fs = require('fs');
const path = require('path');

const draftsFile = '/Users/justinsm1max/Desktop/연구자동화에이전트들/pipeline/shadow/blog_posts_drafts.json';
const pageJsFile = '/Users/justinsm1max/Desktop/unible_harness/moneytong/src/app/blog/sweet-potato-pilot/page.js';

const drafts = JSON.parse(fs.readFileSync(draftsFile, 'utf-8'));
const draft = drafts[0];

let htmlContent = draft.content
  .replace(/\[PARTNERS_LINK_PLACEHOLDER\]/g, '<a href="#" class="btn-primary" style="display:inline-block; background:#e67e22; color:white; padding:12px 24px; border-radius:8px; font-weight:bold; font-size:1.1rem; text-decoration:none; margin: 15px 0;">👉 해남 특등급 꿀고구마 가격 확인하기</a>')
  .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="https://via.placeholder.com/800x400?text=TV+Broadcast+Captured+Image" alt="$1" style="max-width: 100%; border-radius: 8px; margin: 20px 0;" />')
  .split(/\r?\n\r?\n/)
  .map((para, index) => {
    para = para.trim();
    if (para.startsWith('### ')) return `<h3>${para.replace(/^###\s*/, '')}</h3>`;
    if (para.startsWith('## ')) return `<h2>${para.replace(/^##\s*/, '')}</h2>`;
    if (para.startsWith('# ') && index === 0) return ``; // Title handled separately
    if (para.startsWith('- ') || para.startsWith('* ')) {
      const lis = para.split(/\r?\n/).map(li => `<li>${li.replace(/^[-*]\s*/, '')}</li>`).join('');
      return `<ul>${lis}</ul>`;
    }
    if (para.startsWith('|')) {
       // Simple table parser
       const rows = para.split(/\r?\n/).filter(r => r.trim().startsWith('|'));
       let tableHtml = '<table style="width:100%; border-collapse: collapse; margin: 20px 0;">';
       rows.forEach((row, i) => {
         if (row.includes('---')) return; // skip divider
         const cells = row.split('|').filter(c => c.trim() !== '');
         tableHtml += '<tr>' + cells.map(c => {
           const tag = i === 0 ? 'th' : 'td';
           return `<${tag} style="border: 1px solid #ddd; padding: 12px; text-align: left;">${c.trim()}</${tag}>`;
         }).join('') + '</tr>';
       });
       tableHtml += '</table>';
       return tableHtml;
    }
    return `<p>${para.replace(/\r?\n/g, '<br/>')}</p>`;
  })
  .join('');

const pageJsContent = `
import JsonLd from '@/components/JsonLd';

export const metadata = {
  title: ${JSON.stringify(draft.title + " | 머니통")},
  description: "KBS 생생정보통에서 극찬한 해남 꿀고구마 피낭시에 방문 후기 및 주문 방법"
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://moneytong.pages.dev/about/#person",
      "name": "머니통 편집부",
      "url": "https://moneytong.pages.dev",
      "jobTitle": "Editor",
      "worksFor": {
        "@type": "Organization",
        "name": "머니통"
      }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://moneytong.pages.dev/blog/sweet-potato-pilot/#article",
      "headline": ${JSON.stringify(draft.title)},
      "description": "KBS 생생정보통에서 극찬한 해남 꿀고구마 피낭시에 방문 후기 및 주문 방법",
      "datePublished": "2026-07-30T00:00:00+09:00",
      "author": {
        "@id": "https://moneytong.pages.dev/about/#person"
      }
    }
  ]
};

export default function SweetPotatoPost() {
  return (
    <>
      <JsonLd data={schemaData} />
      <article className="post">
        <h1>${draft.title}</h1>
        <p className="post-meta">2026-07-30 · 머니통 편집부</p>

        <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(htmlContent)} }} />
        
        <div className="eeat-byline" style={{marginTop: '40px'}}>
          <strong>ℹ️ 공정거래위원회 지침 준수</strong>
          파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있습니다.
        </div>
      </article>
    </>
  );
}
`;

fs.writeFileSync(pageJsFile, pageJsContent, 'utf-8');
console.log('Pilot page updated successfully.');
