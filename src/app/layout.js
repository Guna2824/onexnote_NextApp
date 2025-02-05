import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note - Online Note Taking and Download in Text Format",
  description:
    "Easily take notes online and download them in text format with our user-friendly note-taking app.",
  keywords: [
    "online note-taking",
    "download notes as text",
    "note app",
    "text format notes",
    "free note app",
    "note management",
    "digital notebook",
    "simple note-taking",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Easily take notes online and download them in text format with our user-friendly note-taking app."
        />
        <meta
          name="keywords"
          content="online note-taking, download notes as text, note app, text format notes, free note app, note management, digital notebook, simple note-taking"
        />
        <meta name="author" content="Your Company Name" />
        <meta
          property="og:title"
          content="Note - Online Note Taking and Download in Text Format"
        />
        <meta
          property="og:description"
          content="Easily take notes online and download them in text format with our user-friendly note-taking app."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:image" content="your_image_url_here" />
        {/* Ensure you add an actual image URL */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Note - Online Note Taking and Download in Text Format"
        />
        <meta
          name="twitter:description"
          content="Easily take notes online and download them in text format with our user-friendly note-taking app."
        />
        <meta name="twitter:image" content="your_image_url_here" />
        {/* Ensure you add an actual image URL */}
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        {/* Google Ads sence */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7097940359763948"
     crossOrigin="anonymous"></script>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:''; 
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
            `,
          }}
        />
        {/* End Google Analytics */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
