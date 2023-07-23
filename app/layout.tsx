import React from 'react'
import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Prompts',
}

export default function RootLayout({children}: any) {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}
