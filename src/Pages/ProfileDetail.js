import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import formatDate from '../Helper/formatDate'
function ProfileDetail() {
    const { id } = useParams()
    const [profile, setProfile] = useState()
    const [experience, setExperience] = useState([])

    const getProfile = () => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/profile/` + id).then((res) => {
            setProfile({ ...profile, ...res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    const getWorkExperience = () => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/work_experience?user_id=${id}`).then((res) => {
            setExperience(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProfile()
        getWorkExperience()
    }, [])




    return (
        <div className='container' data-testid="profile-detail">
            <div className='d-flex gap-4 mt-4 py-4 px-4 shadow '>
                <div className='text-center'>
                    <img style={{ width: '350px', height: '350px' }} src={profile?.profile_picture} className="border card-img-top rounded-circle" alt="profile" />
                    <h2 className='mt-3 fw-bold'>{profile?.name}</h2>
                    <p>{profile?.age + " Tahun"}</p>
                </div>
                <div style={{ width: '100%' }}>
                    <h5>Work Experience</h5>
                    <div className=' flex flex-column gap-4'>
                        {experience.map((experience, index) => {
                            return (
                                <div key={index} className='shadow-sm  py-4 px-4 w-full d-flex gap-4 border-bottom'>
                                    <div className=''>
                                        <img style={{ width: '100%', height: '70px' }} src={experience.company_logo} className=" rounded border card-img-top " alt="profile" />
                                    </div>
                                    <div className='text-left text-aligns-center '>
                                        <h5>{experience.job_title}</h5>
                                        <p className="text-secondary">{experience.company} </p>
                                        <p className="text-secondary">{formatDate(new Date(experience.start_date))} - {experience.end_date}</p>
                                    </div>
                                    <p className='text-secondary'>{experience.job_description}</p>
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