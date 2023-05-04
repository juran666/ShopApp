import React from 'react'
import TabBarBaseDemo from '@/components/TabBar'
import { Outlet } from 'react-router-dom'

const index:React.FC= () => {

    const tabs:any = [
        {
          key: 'home',
          title: '首页',
          
          // badge: Badge.dot,
        },
        {
          key: 'classification',
          title: '分类',
          // badge: '5',
        },
        {
          key: 'shoping',
          title: '购物车',
        
          // badge: '99+',
        },
        {
          key: 'user',
          title: '我的',
    
        },
      ]
    return (
        <div className='box'>
            <div className='top'>
            </div>
            <div className='main'>
                <Outlet></Outlet>
            </div>
            <div>
                <TabBarBaseDemo list={tabs}></TabBarBaseDemo>
            </div>
        </div>
    )
}

export default index