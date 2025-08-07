import React from 'react'
import {Hero} from '../Component/Hero.jsx'
import LatestCollection from '../Component/LatestCollection.jsx'
import BestSeller from '../Component/BestSeller.jsx'
import ExchangePolice from '../Component/ExchangePolice.jsx'
import EmailBox from '../Component/EmailBox.jsx'


const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <ExchangePolice/>
      <EmailBox/>
     
    </div>

  )
}

export default Home