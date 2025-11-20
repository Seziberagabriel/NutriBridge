import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NutriBridge - Combat Malnutrition in Rwanda',
  description: 'Digital platform for nutrition education, growth tracking, and community support',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" fontSize="90" fontWeight="bold" fill="%23D97706">🌾</text></svg>',
      },
    ],
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: '#D97706',
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
