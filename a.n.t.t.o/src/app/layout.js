import "./globals.css";

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: "A.N.T.T.O",
  description: "An education focused social media platform for people who are enthusiastic about learning new skills or topics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" theme-data="mytheme">
      <head></head>
      <body className='flex flex-col min-h-screen'>
        <Navbar isLoggedIn={false} />
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
