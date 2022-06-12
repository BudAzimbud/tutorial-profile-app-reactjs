import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import NavbarHome from '../Component/NavbarHome'
import router from './index'

const PrivateRouter = ({ children }) => {
    const history = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("profile_id")) {
            history('/login')
        }
    }, [history])
    return <>
        <NavbarHome />
        {children}
    </>
}



function Router() {
    return (
        <BrowserRouter data-testid="route">
            <Routes>
                {
                    router.map((route, index) => {
                        if (route.private) {
                            return <Route key={index} path={route.path} element={
                                <PrivateRouter>
                                    {route.page}
                                </PrivateRouter>
                            } />
                        }
                        return <Route key={index} path={route.path} element={route.page} />
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router