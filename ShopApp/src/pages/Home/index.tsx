import React from 'react'
import { persistor, store } from '@/store'
const index = () => {
  const stores=store.getState()
  console.log(stores.user)
    return (
        <div className='box'>
          home
        </div>
    )
}

export default index