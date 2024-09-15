
import SearchInput from '@/components/common/SearchInput'
import React from 'react'

function page({searchParams}:{searchParams: {[key: string] : string | undefined}}) {
  console.log("The query parsms is" , searchParams?.q)
  return (
    <div>
        <SearchInput/>
    </div>
  )
}

export default page