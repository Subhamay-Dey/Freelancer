import React from 'react'
import UserAvatar from '../common/UserAvatar'

function PostCard() {
  return (
    <div>
      <div className='flex space-x-2'>
        <UserAvatar name='Subho'/>
        <div className=''>
          <p>Subho</p>
        <p>An hour ago</p>
        </div>
        
      </div>
    </div>
  )
}

export default PostCard