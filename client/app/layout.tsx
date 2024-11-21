import type { Metadata } from "next";
import "./globals.css";
import UserContextProvider from "@/providers/auth/UserContextProvider";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import Header from "./component/Header/Header";
import MiniSideBar from "./component/MiniSideBar/MiniSideBar";
import SidebarProvider from "@/providers/MiniSideBarProvider";
import MainContentLayoutProvider from "@/providers/MainContentLayoutProvider";
import MainLayoutProvider from "@/providers/MainLayoutProvider";
import GTMProvider from "@/providers/GTMProvider";

const inter = Inter({
  subsets: ["latin",]
})

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A tool to manage tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMProvider />
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" />
      </head>
      <body
        className={inter.className}
      >
        <Toaster position="top-center" />
        <UserContextProvider>
          <div className="h-full flex overflow-hidden">
            <MiniSideBar />
            <div className="flex-1 flex flex-col">
              <Header />
              <MainContentLayoutProvider>
                <MainLayoutProvider>{children}</MainLayoutProvider>
                <SidebarProvider />
              </MainContentLayoutProvider>
            </div>
          </div>
        </UserContextProvider>
      </body>
    </html >
  );
}
