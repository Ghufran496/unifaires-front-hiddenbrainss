"use client";

import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import "remirror/styles/all.css"; // remirror css
import "./globals.css";
import "./styles/scrollbar.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Suspense, useState } from "react";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import CustomLoader from "@/components/layouts/CustomLoader";
import { CommentOutlined } from "@ant-design/icons";
import HelpChatSection from "@/components/pages/HelpChatSection";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [viewMessage, setViewMessage] = useState(false);
  return (
    <html lang="en">
      <body>
      {/* <div id="google_translate_element"></div> */}
        <Toaster position="top-center" />
        <Providers>
          <AntdRegistry>
            <Suspense fallback={<CustomLoader />}>
              <Header />
              {children}
              <Footer />
              <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-10">
                {viewMessage && (
                  <div className="h-[500px]">
                    <HelpChatSection setViewMessage={setViewMessage} />
                  </div>
                )}
                <div className="flex justify-end items-end bottom-0">
                  <CommentOutlined
                    className="text-3xl bg-purple-700 p-2 rounded-full text-white hover:cursor-pointer font-bold border-2 border-white"
                    onClick={() => setViewMessage(!viewMessage)}
                  />
                </div>
              </div>
            </Suspense>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
