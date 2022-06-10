import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProfile from '../Component/CardProfile'
function Home() {

    const [profiles, setProfile] = useState([])

    useEffect(() => {
        axios.get(`${[process.env.REACT_APP_URL_BACKEND]}/profile`).then((res) => {
            setProfile(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="container  text-dark" data-testid="home">
            <div className="row row-cols-6 gap-4" data-testid="row-profile">
                {profiles.map((profile) => (
                    <CardProfile
                        img={profile.profile_picture}
                        name={profile.name}
                        key={profile.id}
                        id={profile.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home