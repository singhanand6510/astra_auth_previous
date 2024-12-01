import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
var inter = Inter({ subsets: ["latin"] });
export var metadata = {
    title: "GEN-AI Answers For Long Youtube Videos",
    description: "Read Summery And Ask Questions With YT Videos",
};
export default function RootLayout(_a) {
    var children = _a.children;
    return (<ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>);
}
