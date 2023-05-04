import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
function User() {
    const navgate=useNavigate()
    const login=()=>{
        navgate('/login')
    }
    const register=()=>{
        navgate('/register')
    }
    return (
        <div>
            <button onClick={()=>login()}>登录</button>
            <button onClick={()=>register()}>注册</button>
        </div>
    )
}

export default User
