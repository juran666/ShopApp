import {
    Routes,
    Route,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Box, Spinner, Text, Layer } from 'grommet';

const Frame = lazy(() => import('@/pages/Frame'))
const Home = lazy(() => import('@/pages/Home'))
const Serch = lazy(() => import('@/pages/Serch'))
const Logins = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Shoping = lazy(() => import('@/pages/Shoping'))
const ClassIfication = lazy(() => import('@/pages/ClassIfication'))
const User = lazy(() => import('@/pages/User'))
const Texts = lazy(() => import('@/components/TabBar'))
const Password = lazy(() => import('@/pages/Password'))
// const router = () => {
//     let routes = [
//         {
//             path: '/',
//             element:<Home />,
//             meta:{title:'首页'}
//         },
//         {
//             path: '/home',
//             element: (<Home />),
//             meta:{title:'首页'}
//         },{
//             path: '/serch',
//             element: (<Serch />),
//             meta:{title:'搜索',power:true}
//         },
//         {
//             path:'/shoping',
//             element:(<Shoping />),
//             meta:{title:'购物车',power:true}
//         },
//         {
//             path:'/classification',
//             element:(<ClassIfication />),
//             meta:{title:'商品分类'}
//         },
//         {
//             path:'/user',
//             element:(<User />),
//             meta:{title:'个人主页'}
//         },
//         {
//             path: '/login',
//             element: (<Login />),
//             meta:{title:'登录'}
//         },
//         {
//             path:'/register',
//             element:<Register/>,
//             meta:{title:'注册'}
//         }
//     ]
//     return useRoutes(routes)
// }

export const router = () => {
    const location = useLocation()
    let token = () => {
        let token = sessionStorage.getItem('token')
        return token ? true : false
    }
    const navgate = useNavigate()
    useEffect(() => {
        // console.log(location)
        routes.forEach(element => {
            if (element.path == location.pathname) {

                if (element.meta.power && !token()) {
                    navgate('/login')
                }
                document.title = element.meta.title

            } else {
                if (element.chidren) {

                    element.chidren.forEach(element => {
                        if (element.path == location.pathname) {

                            if (element.meta.power && !token()) {
                                navgate('/login')
                            }

                            document.title = element.meta.title

                        }
                    });
                }
            }
        });
    }, [location])

    const routes = [
        {
            path: '/',
            element: <Frame />,
            meta: { title: '首页', power: false },
            chidren: [
                {
                    path: '/',
                    element: <Home />,
                    meta: { title: '首页', power: false },
                },
                {
                    path: '/home',
                    element: (<Home />),
                    meta: { title: '首页', power: false }
                }, {
                    path: '/serch',
                    element: (<Serch />),
                    meta: { title: '搜索', power: false }
                },
                {
                    path: '/shoping',
                    element: (<Shoping />),
                    meta: { title: '购物车', power: false }
                },
                {
                    path: '/classification',
                    element: (<ClassIfication />),
                    meta: { title: '商品分类', power: false }
                },
                {
                    path: '/user',
                    element: (<User />),
                    meta: { title: '个人主页', power: false }
                },
            ]
        },

        {
            path: '/login',
            element: (<Logins />),
            meta: { title: '登录', power: false }
        },
        {
            path: '/password',
            element: (<Password />),
            meta: { title: '忘记密码', power: false }
        },
        {
            path: '/register',
            element: <Register />,
            meta: { title: '注册', power: false }
        },
        {
            path: '/text',
            element: <Texts />,
            meta: { title: '注册', power: false }
        }
    ]




    return (
        <Routes>

            {routes.map((item, i) => (
                <Route key={item.path} path={item.path} element={<Suspense fallback={<Layer>
                    <Box
                        align="center"
                        justify="center"
                        gap="small"
                        direction="row"
                        alignSelf="center"
                        pad="large"
                    >
                        <Spinner />
                        <Text>Loading...</Text>
                    </Box>
                </Layer>} >
                    {
                        item.element
                    }
                </Suspense>}>
                    {item.chidren?.map((items, i) => (
                        i == 0 ? <Route key={items.path + i} path={items.path} element={
                            <Navigate to={item.chidren[1].path} />
                        } /> : <Route key={items.path} path={items.path} element={<Suspense fallback={<Layer>
                            <Box
                                align="center"
                                justify="center"
                                gap="small"
                                direction="row"
                                alignSelf="center"
                                pad="large"
                            >
                                <Spinner />
                                <Text>Loading...</Text>
                            </Box>
                        </Layer>} >
                            {
                                items.element
                            }
                        </Suspense>} />
                    ))}
                </Route>
            ))}
        </Routes>
    )
}
export default router
