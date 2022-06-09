import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import router from './index'
const PrivateRouter = (children) => {
    const history = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            history('/')
        }
    }, [history])

    return <>{children}</>
}

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {
                    router.map((route, index) => {
                        return <Route key={index} path={route.path} element={route.page} />
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router