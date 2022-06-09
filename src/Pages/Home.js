import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardProfile from '../Component/CardProfile'

function Home() {

    const [profiles, setProfile] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/profile').then((res) => {
            setProfile(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="container  text-dark">
            <div className="row row-cols-6 ">
                {profiles.map((profile) => (
                    <CardProfile
                        img={profile.profile_picture.myFile}
                        name={profile.name}
                        bio={profile.work_experience[0].job_title}
                        id={profile.id}
                    />
                ))}
            </div>
        </div>

    )
}

export default Home