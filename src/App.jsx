import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProgressSection from './components/ProgressSection'
import ServicesSection from './components/ServicesSection'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProgressSection />
        <ServicesSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
