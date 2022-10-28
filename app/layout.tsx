import React from 'react';
import './globals.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'crossorigin'} />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="icon" href="/favicon.ico" />
        <title>Todo App using Next.js + Tigris</title>
        <meta name="description" content="Tigris app tutorial" />
      </head>
      <body>{children}</body>
    </html>
  );
}
