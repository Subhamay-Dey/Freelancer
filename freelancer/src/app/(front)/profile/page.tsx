import UserAvatar from '@/components/common/UserAvatar'
import React from 'react'

function Profile() {
  return (
    <div className='flex justify-between items-center'>
        <div>
            <p className='text-2xl font-bold'>Subho</p>
            <p className='font-bold'>@subho</p>
        </div>
        <UserAvatar name='Subhamay' width={5} height={5}/>
    </div>
  )
}

export default Profile