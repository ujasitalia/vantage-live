import "@/styles/globals.css";
import Header from "./Header";
import Providers from "./Providers";
export const metadata = {
  title: "Vantage",
  description: "A realtime news service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.jpeg" />
      </head>

      <body className="bg-gray-100 dark:bg-zinc-900 trasnition-all duration-700">
        <Providers>
          {/* header */}
          <Header />

          <div className="max-w-6xl mx-auto">
            {/* main components */}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
