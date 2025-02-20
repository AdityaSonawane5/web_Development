import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'


const category=[
    "Frontend Developer",
    "Backend Developer",
    "Data Scienties",
    "Graphic Designer",
    "FullStak Developer"
]
const CategoryCarousel = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
            {
                category.map((cat,index)=>(
                    <CarouselItem></CarouselItem>
                ))
            }
            
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
