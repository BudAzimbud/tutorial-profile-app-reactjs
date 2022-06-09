import EditProfile from "../Pages/Setting";
import Home from "../Pages/Home";
import ProfileDetail from "../Pages/ProfileDetail";

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
    }
]

export default router