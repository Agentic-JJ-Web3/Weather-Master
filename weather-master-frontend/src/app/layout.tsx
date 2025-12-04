import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Weather Master - Smart Weather Suggestions',
    description: 'Get weather forecasts with intelligent clothing and activity suggestions',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
