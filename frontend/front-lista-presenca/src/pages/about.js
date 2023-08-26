import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function About() {
    return (
        <main className={`flex min-h-screen ${inter.className}`}>
          <h1>Olá mundo</h1>
        </main>
      )
}

export default About;
