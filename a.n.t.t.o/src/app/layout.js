import "./globals.css";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "Surrey Lighthouse",
  description: "An engaging web application that will help job-ready graduates and undergraduates to find job and placement opportunities and provide personalised support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" theme-data="mytheme">
      <head></head>
      <body className='flex flex-col min-h-screen'>
        <Navbar isLoggedIn={true} />
          <div className="flex-grow w-full">
            <div className='w-full max-w-[1280px] mx-auto p-5'>
              {children}
            </div>
          </div>
        <Footer />
      </body>
    </html>
  );
}
