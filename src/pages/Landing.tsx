import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Screenshots from '../components/Screenshots'
import FeatureCards from '../components/FeatureCards'
import InstallSection from '../components/InstallSection'
import HowItWorks from '../components/HowItWorks'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Screenshots />
      <FeatureCards />
      <InstallSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </>
  )
}
