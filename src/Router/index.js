import Home from "../Pages/Home";

const router = [
    {
        path: "/",
        page: <Home />,
        private: true
    },
    {
        path: '/profile/:id',
        page: <Home />,
        private: true
    }
]

export default router