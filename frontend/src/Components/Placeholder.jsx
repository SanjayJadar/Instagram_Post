import React from 'react'

const Placeholder = () => {
  return (
    <div className='placeholder-box flex flex-col items-center justify-center'>
        {/* Empty box as a placeholder */}
        {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className='w-96 h-96 bg-gray-300 m-8'></div>
        ))}
        <div className='m-8'>Loading...</div>
    </div>
  )
}

export default Placeholder