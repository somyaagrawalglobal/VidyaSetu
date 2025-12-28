import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AOSInitializer from "@/components/AOSInitializer";
import { AuthProvider } from "@/components/AuthProvider";
import { ToastProvider } from "@/components/ToastContext";
import "./globals.css";

export const metadata = {
  title: "VidyaSetu - Professional Learning Platform",
  description: "Advanced certification programs for tomorrow's leaders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800 overflow-x-hidden">
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            <AOSInitializer />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
