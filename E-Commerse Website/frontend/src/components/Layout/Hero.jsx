import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp';
const Hero = () => {
  return (
    <section className='relative'>
      <img src={heroImg} alt="Rabbit" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover' />

            {/*bg-opacity-5 cha pahile khalhcya className mathe bg-black hota*/}
      <div className='absolute inset-0 bg-opacity-5 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
                Vacation
            </h1>
        </div>
      </div>
    </section>
  )
}

export default Hero
