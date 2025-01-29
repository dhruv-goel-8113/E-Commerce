import React from 'react'
import {MdOutlineLocalOffer} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'

export const Hero = () => {
  return (
    <section className='relative bg-hero bg-center bg-no-repeat bg-cover h-screen w-full pb-12'>
      <div className='max_padd_container relative top-20 xs:top-[7.5rem]'>
        <h1 className='h2 capitalize max-w-[50rem]'>Digital Shopping Hub Junction</h1>
        
        {/* Ensuring proper alignment for paragraph text */}
        <p className='text-gray-50 regular-16 mt-4 max-w-[35rem] leading-relaxed text-justify'>
          Welcome to Digital Shopping Hub Junction — your one-stop destination for all things shopping! Whether you're looking to upgrade your wardrobe, refresh your home, or find the latest tech gadgets, we’ve got you covered. Explore our carefully curated collection of products, handpicked to ensure the best quality and style for every taste. From top-tier fashion brands to everyday essentials, we cater to all your needs in one place.
          <br /><br />
          Why shop with us? We offer more than just products — we provide a shopping experience. Enjoy exclusive discounts, flash sales, and limited-time offers on the most sought-after items. Plus, with our user-friendly platform, finding exactly what you're looking for is easy, whether you’re browsing on your phone or computer.
        </p>
        
        {/* Ratings and reviews */}
        <div className='flexStart !items-center gap-x-4 my-6'>
          <div className='!regular-24 flexCenter gap-x-3'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className='bold-16 sm:bold-20'>
            176k <span className='regular-16 sm:regular-20'>Excellent Reviews</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="max-xs:flex-col flex gap-2">
          <NavLink to={''} className={"btn_dark_rounded flexCenter"}>Shop now</NavLink>
          <NavLink to={''} className={"btn_dark_rounded flexCenter gap-x-2"}>
            <MdOutlineLocalOffer className='text-xl' /> Offers
          </NavLink>
        </div>
      </div>
    </section>
  )
}
