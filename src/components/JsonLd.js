// src/components/JsonLd.js
// Next.js App Router 환경에서 JSON-LD 구조화 데이터를 안전하게 주입하기 위한 공통 컴포넌트입니다.

import React from 'react';

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
