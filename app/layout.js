import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ToastContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

export const metadata = {
  title: "VidyaSetu - Professional Learning Platform",
  description: "Advanced certification programs for tomorrow's leaders.",
  icons: {
    icon: "/assets/images/brand-logo.png",
    apple: "/assets/images/brand-logo.png",
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
