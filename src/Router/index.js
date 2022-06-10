import EditProfile from "../Pages/Setting";
import Home from "../Pages/Home";
import ProfileDetail from "../Pages/ProfileDetail";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = [
    {
        path: "/",
        page: <Home />,
        private: true
    },
    {
        path: '/profile/:id',
        page: <ProfileDetail />,
        private: true
    },
    {
        path: '/setting/',
        page: <EditProfile />,
        private: true
    },
    {
        path: '/login',
        page: <Login />,
        private: false,
    },
    {
        path: '/register',
        page: <Register />,
        private: false,
    },
    {
        path: '/:nickname',
        page: <ProfileDetail />,
        private: true
    }
]

export default router