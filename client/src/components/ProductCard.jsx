import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({id, image, name, description, price}) {
  return (
    <div className='bg-gray-600 text-white rounded-lg overflow-hidden shadow-lg max-w-xs transition-shadow duration-300'>
      <Link to={`/product/${id}`}>
      
      <img src={image} alt={name} className='w-full max-h-60 object-contain bg-white '/>
      <div className='p-4 flex flex-col'>
        <h2 className='text-lg text-center font-bold mb-1 text-white'>{name}</h2>
        <span className='text-orange-400 text-center font-semibold mb-2'>${price}</span>
        <p className='text-gray-300 text-sm line-clamp-3'>{description}</p>
      </div>
      </Link>
    </div>
  )
}

export default ProductCard