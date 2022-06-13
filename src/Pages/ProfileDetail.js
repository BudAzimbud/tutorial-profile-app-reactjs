
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import formatDate from '../Helper/formatDate'
import getAge from '../Helper/getAge'
import http from '../Helper/http.'
function ProfileDetail() {
    const { id, nickname } = useParams()
    const [profile, setProfile] = useState()
    const [experience, setExperience] = useState([])
    const history = useNavigate()
    const getProfile = useCallback((user_id) => {
        http.get(`profile/` + user_id).then((res) => {
            setProfile({ ...profile, ...res.data })
        }).catch((err) => {
            console.log(err)
        })
    }, [profile])
    const getWorkExperience = (user_id) => {
        http.get(`work_experience?user_id=${user_id}`).then((res) => {
            setExperience(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const getProfileShare = useCallback(() => {
        const query_search = profile ? `user_id=${profile.id}` : `nickname=${nickname}`
        http.get(`profile_share?${query_search}`).then((res) => {
            console.log(res.data[0])
            if (res.data[0].share || res.data[0].user_id === parseInt(localStorage.getItem("profile_id"))) {
                getProfile(res.data[0].user_id)
                getWorkExperience(res.data[0].user_id)
            } else {
                history('/')
            }


        }).catch((err) => {
            console.log(err)
        })
    }, [id, getProfile, history, nickname, profile])
    useEffect(() => {
        if (!id) {
            getProfileShare()
        } else {
            getProfile(id)
            getProfileShare()
            getWorkExperience(id)
        }

    }, [profile, getProfile, getProfileShare, id])





    return (
        <div className='container' data-testid="profile-detail">
            <div className='d-flex gap-4 mt-4 py-4 px-4 shadow '>
                <div className='text-center'>
                    <img style={{ width: '350px', height: '350px' }} src={profile?.profile_picture} className="border card-img-top rounded-circle" alt="profile" />
                    <h2 className='mt-3 fw-bold'>{profile?.name}</h2>
                    <p>{getAge(profile?.age) + " Tahun"}</p>
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
                                        <p style={{ fontSize: '12px' }} className="text-secondary">{formatDate(new Date(experience.start_date))} - {experience.end_date === "now" ? "Now" : formatDate(new Date(experience.end_date))}</p>
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