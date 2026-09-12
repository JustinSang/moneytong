// scripts/indexnow.js
// 네이버 및 IndexNow 프로토콜 참여 검색엔진에 PING을 날려 빠른 색인을 유도하는 스크립트입니다.
// 빌드 후, 혹은 글 발행 시 실행되도록 구성됩니다.

const https = require('https');
const fs = require('fs');
const path = require('path');

// [설정] 실제 운영 도메인과 발급받은 API 키로 교체해야 합니다.
const HOST = 'moneytong.com';
const API_KEY = 'moneytong-indexnow-key';
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;
const OUT_DIR = path.join(__dirname, '../out/blog');

async function pingIndexNow() {
  console.log('🚀 IndexNow PING 자동화 시작...');

  let urls = [];
  
  try {
    if (fs.existsSync(OUT_DIR)) {
      const files = fs.readdirSync(OUT_DIR);
      files.forEach(file => {
        if (file.endsWith('.html')) {
          const slug = file.replace('.html', '');
          urls.push(`https://${HOST}/blog/${slug}`);
        }
      });
    }
  } catch (error) {
    console.error('URL 목록 추출 중 오류 발생:', error);
  }

  if (urls.length === 0) {
    urls.push(`https://${HOST}/`);
  }

  console.log(`📡 대상 URL ${urls.length}건:`, urls);

  const payload = JSON.stringify({
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => responseBody += chunk);
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ IndexNow PING 성공! (상태 코드: ${res.statusCode})`);
      } else {
        console.error(`❌ IndexNow PING 실패! (상태 코드: ${res.statusCode})`);
        console.error('응답:', responseBody);
      }
    });
  });

  req.on('error', (error) => {
    console.error('IndexNow API 요청 중 네트워크 오류 발생:', error);
  });

  req.write(payload);
  req.end();
}

pingIndexNow();
