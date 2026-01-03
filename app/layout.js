import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ToastContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://www.vidya-setu.com'),
  title: {
    default: "VidyaSetu - Professional Learning Platform",
    template: "%s | VidyaSetu"
  },
  description: "VidyaSetu offers advanced certification programs and professional courses to help you master new skills and advance your career. Join tomorrow's leaders today.",
  keywords: ["VidyaSetu", "Online Learning", "Professional Courses", "Certification", "Education", "Skill Development", "Programming", "Technology"],
  authors: [{ name: "VidyaSetu Team" }],
  creator: "VidyaSetu",
  publisher: "VidyaSetu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vidya-setu.com',
    title: "VidyaSetu - Professional Learning Platform",
    description: "Advanced certification programs for tomorrow's leaders.",
    siteName: 'VidyaSetu',
    images: [
      {
        url: '/assets/images/brand-logo.png',
        width: 1200,
        height: 630,
        alt: 'VidyaSetu - Professional Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "VidyaSetu - Professional Learning Platform",
    description: "Advanced certification programs for tomorrow's leaders.",
    images: ['/assets/images/brand-logo.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 overflow-x-hidden">
        <AuthProvider>
          <ToastProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
