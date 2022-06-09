import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProfileDetail() {
    const { id } = useParams()
    const [profile, setProfile] = useState()

    useEffect(() => {
        axios.get('http://localhost:3000/profile/' + id).then((res) => {
            setProfile(res.data)

        })
    }, [])

    console.log(profile)

    return (
        <div className='container' data-testid="profile-detail">
            <div className='d-flex gap-4 mt-4 py-4 px-4 shadow '>
                <div className='text-center'>
                    <img style={{ width: '350px', height: '350px' }} src={profile?.profile_picture.myFile} className="border card-img-top rounded-circle" alt="profile" />
                    <h2 className='mt-3 fw-bold'>{profile?.name}</h2>
                    <p>{profile?.age + " Tahun"}</p>
                </div>
                <div style={{ width: '100%' }}>
                    <h5>Work Experience</h5>
                    <div className='text-secondary'>
                        {profile?.work_experience.map((experience) => {
                            return (
                                <div className='shadow py-4 px-4 w-full d-flex gap-4 border-bottom'>
                                    <div className=''>
                                        <img style={{ width: '100%', height: '70px' }} src={"https://img.inews.co.id/media/822/files/inews_new/2022/06/08/menteri_pertahanan_prabowo_subianto.jpg"} className=" rounded border card-img-top " alt="profile" />
                                    </div>
                                    <div className='text-left text-aligns-center'>
                                        <h5>{experience.job_title}</h5>
                                        <p>{experience.company} </p>
                                        <p>{experience.start_date} - {experience.end_date}</p>
                                    </div>
                                    <p>{experience.job_description}</p>
                                </div>
                            )
                        })}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetail