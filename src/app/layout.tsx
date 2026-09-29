import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Loader } from '@/components/loader/Loader';
import { profile } from '@/data/portfolio';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-mono', display: 'swap' });

const description =
  'Soumita Bhattacharya Sen — Senior BI Developer and Data Analyst with 11+ years across Power BI, Tableau, Qlik and modern data platforms.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.soumitabhattacharyasen.com'),
  title: 'Soumita Bhattacharya Sen · Senior BI Developer',
  description,
  authors: [{ name: 'Soumita Bhattacharya Sen' }],
  openGraph: {
    type: 'profile',
    title: 'Soumita Bhattacharya Sen · Senior BI Developer',
    description,
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Portrait of Soumita Bhattacharya Sen' }],
  },
  // square photo, so the compact card rather than the wide banner
  twitter: { card: 'summary' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0a1f' },
    { media: '(prefers-color-scheme: light)', color: '#fff6ea' },
  ],
};

/**
 * Runs before first paint:
 * - resolves theme: a saved choice wins, otherwise light (Prism) is the default
 * - opts into the 3D tunnel only when JS runs and the user hasn't asked for reduced motion.
 *   Without it, the page renders as a plain stacked document.
 * - shows the loading screen (html.loading); <Loader> clears it once the page is ready.
 *   The timeout is a safety net so a failed script can never leave the page covered.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('loading');setTimeout(function(){d.classList.remove('loading')},10000);try{var t=localStorage.getItem('theme');if(t!=='dark'){t='light'}d.dataset.theme=t;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('tunnel')}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#contact">
          Skip to contact
        </a>
        {children}
        <Loader name={profile.shortName.toLowerCase()} />
      </body>
    </html>
  );
}
