import React, { useState } from 'react'
import Style from './index.module.less'
import {
  User,
  Lock, MailOption, Phone, Chat, FormPrevious
} from 'grommet-icons';
import { Notification } from 'grommet';
import { useNavigate } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import { getRegister } from '@/api/http'
import Verify from '@/components/Verify'
const index: React.FC = () => {
  let [username, getUsername] = useState('')
  let [password, getPassword] = useState('')
  let [email, getEmail] = useState('')
  let [phones, getPhones] = useState('')
  let [auto, getAuto] = useState('')
  let [show, getshow] = useState('none')
  let [flag, getFlag] = useState(true)
  let [mesage, setmesage] = useState('')
  const [visible, setVisible]: any = useState(false);
  const Navigate = useNavigate()
  //账号更改事件
  const customer = (e: any) => {
    getUsername(e.target.value)
  }
  //密码更改
  const cipher = (e: any) => {
    getPassword(e.target.value)
  }
  // 邮箱更改事件
  const custoEmial = (e: any) => {
    getEmail(e.target.value)
  }
  // 手机更改事件
  const custophone = (e: any) => {
    getPhones(e.target.value)
  }
  //验证码更改
  const custoauth = (e: any) => {
    getAuto(e.target.value)
  }
  const register = () => {
    if (username.length == 0) {
      setVisible(true);
      setmesage('账号不能为空')
      return
    }
    if (email.length == 0) {
      setVisible(true);
      setmesage('邮箱不能为空')
    } else {
      if (!emit.test(email)) {
        setVisible(true);
        setmesage('请输入正确邮箱')
        return
      } 
       
      if (password.length == 0) {
        setVisible(true);
        setmesage('密码不能为空')
        return
      }
      if (phones.length == 0) {
        setVisible(true);
        setmesage('手机号不能为空')
        return
      } else {
        if (!phone.test(phones)) {
          setVisible(true);
          setmesage('请输入正确的手机号')
          setVisible(true);
          return
        }
      }
      if (auto.length == 0) {
        setVisible(true);
        setmesage('验证码不能为空')
        return
      }
     
     
    }
    getRegister({ username, password }).then((res: any) => {
      if (res.code == 200) {
        console.log(res);
        // Navigate('')
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
  // 根据条件修改按钮的样式
  const handle = (val: boolean) => {
    getFlag(val)
  }

  //后退路由
  const go = () => {

    history.go(-1)
  }
  //声明变量控制验证信息
  const [text, setText] = useState('获取验证码')
  //控制禁止
  const [desable, setdesable] = useState(false)
  //获取验证码
  const toAuth = () => {
    if (phones.length == 0) {
      setVisible(true);
      setmesage('手机号不能为空')
    } else {
      if (!phone.test(phones)) {
        setmesage('请输入正确的手机号')
        setVisible(true);
      } else {
        setVisible(false)
        setdesable(true)
        //计时10s
        let a = 60
        setText(a + 's后重新获取')
        const time = setInterval(() => {
          a = a - 1
          setText(a + 's后重新获取')
        }, 1000)
        setTimeout(() => {
          clearInterval(time)
          setText('获取验证码')
          setdesable(false)
        }, 60000);
      }
    }
    // setVisible(true);


  }
  //邮箱验证
  let emit = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // if (!emit.test(email)) {
  //   getemptyEmail('邮箱格式不正确')
  // } else {
  //   getSign({ username, email, password, VerificationCode }).then((res: any) => {
  //     if (res.code == 200) {
  //       push('/home')
  //     }
  //   })
  // }
  //手机验证
  let phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  const onClose = () => setVisible(undefined);
  return (
    <div className={Style.register}>

      <nav>
        <div className={Style.icon} onClick={() => go()}>
          <FormPrevious />
          {/* <span>注册</span> */}
          <span>注册</span>
          <span></span>
        </div>
      </nav>
      <main>
        <form action="" onSubmit={(e) => e.preventDefault()}>

          <div className={Style.usename}>
            <User />
            <input type="text" placeholder='请输入账号' onInput={e => customer(e)} />
          </div>
          <div className={Style.usename}>
            <MailOption />
            <input type="text" placeholder='请输入邮箱' onInput={e => custoEmial(e)} />
          </div>
          <div className={Style.password}>
            <Lock />
            <input type="password" placeholder='请输入密码' onInput={e => cipher(e)} />
          </div>
          <div className={Style.usename}>
            <Phone />
            <input type="text" placeholder='请输入手机号获取验证功码' onInput={e => custophone(e)} />

            <button disabled={desable} className={desable ? Style.auth1 : Style.auth} onClick={() => toAuth()} >{text}</button>
            {visible && (
              <Notification
                toast
                title={mesage}
                onClose={onClose}
                time={800}
              />
            )}
          </div>
          <div className={Style.usename}>
            <Chat />
            <input type="text" placeholder='请输入验证码' onInput={e => custoauth(e)} />
          </div>

          <section>
            <Verify onhandle={handle} />
          </section>
        </form>
        <div className={Style.btn}>
          <button disabled={flag} className={flag ? Style.register : Style.register2} onClick={e => register()} >注册</button >
        </div>
        <p className={Style.forget}>忘记密码？</p>
      </main>
      <div className={Style.coverage} style={{ display: show }}>
        <div className={Style.cover}>
          <div className={Style.dial}>
            <p>{mesage}</p>
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