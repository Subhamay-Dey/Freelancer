import React from 'react'

function loading() {
  return (
    <div className='w-full h-screen flex justify-center items-start'>
        <div className='animate-spin h-10 w-10 border-t-4 border-b-4 border-primary rounded-full'>
        </div>
    </div>
  )
}

export default loading