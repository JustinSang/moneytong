import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import SiteNav from "./_components/SiteNav";

export const metadata = {
  metadataBase: new URL("https://moneytong.com"),
  title: {
    default: "머니통 (MoneyTong) - 일상 속 돈 정보 통하기",
    template: "%s | 머니통",
  },
  description: "정부지원금, 환급금, 보험, 알뜰 금융계산기까지 5060을 위한 쉽고 빠른 돈 정보.",
  icons: { icon: "/favicon.svg" },
  alternates: {
    canonical: "./",
  },
  other: { "google-adsense-account": "ca-pub-6015296958669413" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Script id="mt-theme-init" strategy="beforeInteractive">
          {"(function(){try{var t=localStorage.getItem('mt-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();"}
        </Script>
        {/* 애드센스 광고 로더 — raw script로 렌더(React19가 head로 호이스팅해 실제 실행 스크립트 출력).
            next/script는 정적 export에서 <link preload>만 남아 코드 감지에 부적합. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6015296958669413"
          crossOrigin="anonymous"
        />
        {/* GA4 — NEXT_PUBLIC_GA_ID 설정(예: G-XXXXXXXXXX) 시에만 렌더. 애드센스와 동일 raw script 패턴. */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        ) : null}
        <SiteNav />
        <main className="content">
          {children}
        </main>
        <footer className="site-footer">
          <div className="footer-links">
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
            <Link href="/contact">문의하기</Link>
          </div>
          <p className="disclaimer-text">
            본 사이트의 모든 금융 정보는 참고용이며, 법적 책임의 근거로 사용될 수 없습니다. 실제 거래 시 금융기관의 최신 정보를 확인하시기 바랍니다.
          </p>
          <p>© 2026 머니통(MoneyTong). Operated by Unible Solution.</p>
        </footer>
      </body>
    </html>
  );
}
