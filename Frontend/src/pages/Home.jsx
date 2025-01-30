import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSellers from '../components/BestSellers'
import OurPolicy from '../components/OurPolicy'
import OnSale from '../components/OnSale'
import Fragrance from '../components/Fragrance'
import Watches from '../components/Watches'
import Jewellery from '../components/Jewellery'
import DeliveryNote from '../components/DeliveryNote'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <OnSale />
      <Fragrance />
      <Watches />
      <Jewellery />
      <OurPolicy />
      <DeliveryNote />

    </div>
  )
}

export default Home
