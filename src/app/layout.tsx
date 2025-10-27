
import './globals.css';

export const metadata = {
  title: 'Career App',
  description: 'Fixed skeleton app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
