import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <Header />
		<main>
			{children}
		</main>
      </body>
    </html>
  );
}
