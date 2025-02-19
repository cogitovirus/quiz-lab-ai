import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { QuizProvider } from './lib/contexts/QuizContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz Lab AI',
  description: 'AI-powered quiz generator for cloud certification exam preparation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
        <QuizProvider>
          <Header />
            <main className="flex-grow flex flex-col h-full">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  )
}