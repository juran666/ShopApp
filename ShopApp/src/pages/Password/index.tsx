import React, { useState } from 'react'
import Style from './index.module.less'
import {
    User,
    Shop, CodeSandbox, HomeRounded, FormPrevious,
    Chat,
    Close,
    Menu
} from 'grommet-icons';

import { Box, Button, DropButton, Heading, Text } from 'grommet';
import { createBrowserHistory } from 'history';
// import { Space, Button } from 'antd-mobile'
import { getAmend } from '@/api/use'
import Verify from '@/components/Verify'
import { useNavigate, NavLink } from 'react-router-dom'
const align = { top: 'bottom' };
const tabs: any = [
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

const icons: any = [<HomeRounded />, <CodeSandbox />, <Shop />, <User />]

const DropContent = ({ onClose }: any) => (
    <div className={Style.li}>

        {
            tabs.map((item: { key: string; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, i: React.Key | number) => {
                return (
                    <div key={i}>
                        <NavLink to={'/' + item.key}>
                            {icons[i]}
                            <span>{item.title}</span>
                        </NavLink>
                    </div>
                )
            })
        }
    </div>
);
const index: React.FC = () => {
    let [username, getUsername] = useState('')
    let [password, getPassword] = useState('')
    let [flag, getFlag] = useState(true)
    let [show, getshow] = useState('none')
    let [lin, getLin] = useState(false)
    let push = useNavigate()
    const history = createBrowserHistory()
    const customer = (e: any) => {
        getUsername(e.target.value)
    }

    const custoauth = (e: any) => {
        getPassword(e.target.value)
    }

    const register = () => {
        getAmend({ username, password }).then((res: any) => {
            if (res.code == 200) {
                getshow('block')
            }
        })
    }

    const affirm = () => {
        setTimeout(() => {
            getshow('none')
            push('/login')
        }, 100)
    }

    const handle = (val: boolean) => {
        getFlag(val)
    }


    const align = { top: 'bottom' };
    const go = () => {

        history.go(-1)
    }


    const complete = () => {
        if (lin == true) {
            getLin(false)
        }
    }
    const [open, setOpen] = React.useState(false);
    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className={Style.password} onClick={e => complete()}>
            <nav>
                <div className={Style.icon} onClick={() => go()} >
                    <FormPrevious />
                    {/* <span>注册</span> */}

                </div>
                <span>修改密码</span>
                <div className={Style.li}>

                    <Box align="center">
                        <DropButton
                            label={<Menu />}
                            open={open}
                            onOpen={onOpen}
                            onClose={onClose}
                            dropContent={<DropContent />}
                        // dropProps={{ align }}
                        />
                    </Box>
                </div>

            </nav>
            <main>
                <div className={Style.usename}>
                    <User />
                    <input type="text" placeholder='请输入账号' onInput={e => customer(e)} />
                </div>
                <div className={Style.usename}>
                    <Chat />
                    <input type="text" placeholder='请输入验证码' onInput={e => custoauth(e)} />
                </div>
                <section>
                    <Verify onhandle={handle} />
                </section>
                <div className={Style.btn}>
                    <button disabled={flag} className={flag ? Style.register : Style.register2} onClick={e => register()} >修改密码</button >
                </div>
            </main>
            <div className={Style.coverage} style={{ display: show }}>
                <div className={Style.cover}>
                    <div className={Style.dial}>
                        <p>注册成功将跳转到登录页</p>
                    </div>
                    <div>
                        <button onClick={e => affirm()}>确认</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index;