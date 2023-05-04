import React, { useState, useEffect } from 'react'
import Style from './index.module.less'
import { User, Lock, FormPrevious } from 'grommet-icons';
import { useNavigate } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { getRegister,getTypeOneList } from '@/api/http'
import Verify from '@/components/Verify'
import { store } from '@/store'

import { IUserActionType } from '@/store/reducers/user'



// console.log(stores.user.user.name)
const index: React.FC = () => {

const style=async()=>{
  const result:any= await getTypeOneList({ parent_name: '鞋类' })
  // console.log(list)
}
  useEffect(() => {
    const stores = store.getState()

    style()
    console.log(stores)
  }, [])

  let [username, getUsername] = useState('')
  let [password, getPassword] = useState('')
  let [show, getshow] = useState('none')
  let [flag, getFlag] = useState(true)

  const Navigate = useNavigate()
  const customer = (e: any) => {
    getUsername(e.target.value)
  }

  const cipher = (e: any) => {
    getPassword(e.target.value)
  }

  const register = () => {
    getRegister({ username, password }).then((res: any) => {
      if (res.code == 200) {
        console.log(res);
        store.dispatch({
          type: IUserActionType.CHANGE,
          payload: { token: res.data.token }
        })
        Navigate('/home')
      }
      if (res.code == 402) {
        getshow('block')
      }
    })
  }
  const history = createBrowserHistory()
  const affirm = () => {
    setTimeout(() => {
      getshow('none')
    }, 100)
  }

  const handle = (val: boolean) => {
    getFlag(val)
  }

  const toregister = () => {
    Navigate('/register')

  }
  const go = () => {

    history.go(-1)
  }
  return (
    <div className={Style.login}>
      <nav>
        <div className={Style.imim}>
          <img src="http://img11.static.yhbimg.com/yhb-img01/2018/03/26/10/01cf2c685c5d7ddbb21b7c7b961da77454.jpg?imageView2/2/w/750/h/290" alt="" />
          <div className={Style.icon}>
            <div className={Style.clir} onClick={() => go()}>
              <FormPrevious />
            </div>
            <button onClick={() => toregister()}>注册</button>
          </div>
        </div>

      </nav>
      <main>
        <div className={Style.usename}>
          <User />
          <input type="text" placeholder='请输入账号' onInput={e => customer(e)} />
        </div>
        <div className={Style.password}>
          <Lock />
          <input type="text" placeholder='请输入密码' onInput={e => cipher(e)} />
        </div>
        <section>
          <Verify onhandle={handle} />
        </section>
        <div className={Style.btn}>
          <button disabled={flag} className={flag ? Style.register : Style.register2} onClick={e => register()} >登录</button >
        </div>
        <p className={Style.forget} onClick={() => Navigate('/password')}>忘记密码？</p>
      </main>
      <div className={Style.coverage} style={{ display: show }}>
        <div className={Style.cover}>
          <div className={Style.dial}>
            <p>登录失败请重新登录</p>
          </div>
          <div>
            <button onClick={e => affirm()}>确认</button>
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default index