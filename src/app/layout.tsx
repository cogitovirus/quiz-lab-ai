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
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col`}>
        <QuizProvider>
          <Header />
          <main className="flex-grow flex flex-col w-full">
            {children}
          </main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  )
}