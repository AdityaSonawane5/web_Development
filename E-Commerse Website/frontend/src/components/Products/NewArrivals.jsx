import React, { useEffect, useReducer, useRef, useState } from 'react'
import { FiChevronLeft,FiChevronRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const scrollRef=useRef(null);
    const [isDragging,setIsDragging]=useState(false);
    const [startX,setStartX]=useState(0);
    const [scrollLeft,setScrollLeft]=useState(false);
    const [canScrollLeft,setCanScrollLeft]=useState(false);
    const [canScrollRight,setCanScrollRight]=useState(true);

    const newArrivals=[
        {
            _id:'1',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=1",
                    alText:"Stylish Jacket",
                }
            ]
        },
        {
            _id:'2',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=2",
                    alText:"Stylish Jacket",
                }
            ]
        },{
            _id:'3',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=3",
                    alText:"Stylish Jacket",
                }
            ]
        },{
            _id:'4',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=4",
                    alText:"Stylish Jacket",
                }
            ]
        },{
            _id:'5',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=5",
                    alText:"Stylish Jacket",
                }
            ]
        },{
            _id:'6',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=6",
                    alText:"Stylish Jacket",
                }
            ]
        },{
            _id:'7',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=7",
                    alText:"Stylish Jacket",
                }
            ]
        },{
            _id:'8',
            name:"Stylish Jacket",
            price:120,
            images:[
                {
                    url:"https://picsum.photos/500/500?/random=8",
                    alText:"Stylish Jacket",
                }
            ]
        }
    ]

    const handleMouseDown=(e)=>{
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft)
    }

    const handleMouseMove=(e)=>{
        if(!isDragging) return;
        const x=e.pageX - scrollRef.current.offsetLeft;
        const walk=x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }

    const handleMouseUporLeave=(e)=>{
        setIsDragging(false);
    }

    const scroll=(direction)=>{
        const scrollAmount=direction==="left" ? -300 : 300;
        scrollRef.current.scrollBy({left: scrollAmount, behavior: 'smooth'});

    }

    // update scroll Buttons
    const updateScrollButtons=()=>{
        const container=scrollRef.current
        if(container){
            const leftScrollable=container.scrollLeft;
            const rightScrollable=container.scrollWidth > leftScrollable + container.clientWidth; 

            setCanScrollLeft(leftScrollable>0);
            setCanScrollRight(rightScrollable)
        }

        console.log({
            scrollLeft:container.scrollLeft,
            clientWidth:container.clientWidth,
            containerScrollWidth:container.scrollWidth,
            offsetLeft:scrollRef.current.offsetLeft,
        })

    }
    useEffect(()=>{
        const container=scrollRef.current;
        if(container){
            container.addEventListener('scroll',updateScrollButtons)
            updateScrollButtons();
        }
    })
  return (
    <section>
      <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold mb-4'>
            Explore New Arrivals
        </h2>
        <p className='text-lg text-gray-600  mb-8'>
            Discover the Latest styles straight off runway , freshly added to keep your warbrobe on the cutting edge of fashion.
        </p>
        {/* Scroll Button */}
        <div  className='absolute right-0 bottom-[-30px] flex space-x-2'>
            <button onClick={()=>scroll('left')} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                <FiChevronLeft className='text-2xl'/>
            </button>
            <button onClick={()=>scroll('right')} className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                <FiChevronRight className='text-2xl'/>
            </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div ref={scrollRef} className='container mx-auto overflow-x-scroll flex space-x-6 relative' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUporLeave} onMouseLeave={handleMouseUporLeave}>
        {newArrivals.map((product)=>(
            <div key={product._id } className='min-w-[100px] sm:min-w-[50%] lg:min-w-[30%] relative'>
                <img src={product.images[0]?.url} alt={product.images[0]?.alText || product.name} draggable="false" className='w-full h-[500px] object-cover rounded-lg'/>
                <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg'>
                    <Link to={`/product/${product._id}`} className='block'>
                        <h4 className='font-medium'>{product.name}</h4>
                        <p className='mt-1'>${product.price}</p>
                    </Link>
                </div>
            </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals


// 2:13:33 chalu aahe 