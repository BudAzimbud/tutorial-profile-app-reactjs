import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FormControl, Accordion } from 'react-bootstrap'
import FormWorkExperience from '../Component/FormWorkExperience';
import Input from '../Component/Input';
import Modal from '../Component/Modal';
import convertToBase64 from '../Helper/convertBase';
import FormUrlShare from '../Component/FormUrlShare';
import { InternetContext } from '../App';
import http from '../Helper/http.';
function Setting() {
  const [data, setData] = useState({
  });
  const [experience, setExperience] = useState([]);
  const [action, setAction] = useState(0)
  const id = localStorage.getItem("profile_id")
  const [internet] = useContext(InternetContext)
  const updateProfile = useCallback((payload) => {
    http.patch(`profile/` + id, payload).then((res) => {
      console.log(res)
    })
  }, [id])

  const onSubmit = (event) => {
    alert('Profile is update')
    const profileLocalStorage = JSON.parse(localStorage.getItem("profile"))
    if (internet) {
      updateProfile(data)
      return
    }
    localStorage.setItem("profile", JSON.stringify({ ...profileLocalStorage, ...data }))
    event.preventDefault()
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setData({ ...data, profile_picture: base64 });
  };

  const getProfile = useCallback(() => {
    http.get(`profile/` + id).then((res) => {
      const resToString = JSON.stringify(res.data)
      setData(res.data)
      if (!localStorage.getItem("profile")) {
        localStorage.setItem("profile", resToString)
      }
      if (localStorage.getItem("profile") !== resToString) {
        updateProfile(JSON.parse(localStorage.getItem("profile")))
        localStorage.removeItem("profile")
      }
    }).catch((err) => {

    })
  }, [updateProfile, id])

  const addExperience = (data) => {
    http.post(`work_experience`, {
      ...data,
    }).then((res) => {
    }).catch((err) => {
      console.log(data)
      console.log(err.response)
    })
  }

  const getWorkExperience = useCallback(() => {
    http.get(`work_experience?user_id=` + id).then((res) => {
      const resToString = JSON.stringify(res.data)
      setExperience(res.data)
      if (!localStorage.getItem("work_experience")) {
        localStorage.setItem("work_experience", resToString)
      }
      if (localStorage.getItem("work_experience") !== resToString) {
        const work_experience_local = JSON.parse(localStorage.getItem("work_experience"))
        work_experience_local.forEach((experience_local) => {

          if (experience_local.id) {
            updateExperience(experience_local)
          } else {
            console.log(experience_local)
            addExperience(experience_local)
          }
        })
        localStorage.removeItem("work_experience")
      }
    })
  }, [id])

  const updateExperience = (payload) => {
    http.patch(`work_experience/${payload.id}`, {
      ...payload
    }).then((res) => {
    }).catch((err) => {
      console.log(err)
    })
  }


  useEffect(() => {
    if (internet) {
      getProfile()
      getWorkExperience()
    } else {
      setData(JSON.parse(localStorage.getItem("profile")))
      setExperience(JSON.parse(localStorage.getItem("work_experience")))
    }

  }, [action, getProfile, getWorkExperience, internet])



  return (
    <div className="container mt-2 ">
      <form onSubmit={onSubmit}
        className='shadow-sm d-flex flex-column gap-4 p-5 '
      >
        <img src={data.profile_picture} style={{ width: 160, height: 130, }} className="border rounded-circle card-img-top mt-2" alt="..." />
        <FormControl placeholder="Name" type="file" onChange={handleFileUpload} />
        <Input label="Name" placeholder="Name" onChange={(event) => { setData({ ...data, name: event.target.value }) }} defaultValue={data.name} required />
        <Input label="Birthday" placeholder="" type="date" onChange={(event) => { setData({ ...data, age: event.target.value }) }} defaultValue={data.age} required />

        <button className='btn btn-primary'>Save</button>
      </form>
      <FormUrlShare />
      <h5 className='mt-4'> Work Experience</h5>
      <Modal >
        <FormWorkExperience handleSubmit={(value) => {
          alert('your work experience is add')
          if (internet) {
            addExperience({ user_id: id, ...value })
            window.location.reload()
            return
          }
          const work_experience_local = JSON.parse(localStorage.getItem("work_experience"))
          work_experience_local.push({ user_id: id, ...value })
          localStorage.setItem("work_experience", JSON.stringify(work_experience_local))
        }} />
      </Modal>
      <Accordion className='shadow-sm d-flex flex-column gap-4 p-5 ' >
        {
          experience?.map((experience, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>{experience.company}</Accordion.Header>
              <Accordion.Body className="d-flex flex-column gap-2">
                <FormWorkExperience defaultValue={experience}
                  handleSubmit={(value) => {
                    alert('work experience is updated')
                    if (internet) {
                      updateExperience({ ...experience, ...value })
                      return
                    }
                    const work_experience_local = JSON.parse(localStorage.getItem("work_experience"))
                    work_experience_local[index] = { ...work_experience_local[index], ...value }
                    localStorage.setItem("work_experience", JSON.stringify(work_experience_local))
                  }}
                  onDelete={(event) => {
                    http.delete(`work_experience/` + experience.id).then((res) => {
                      setAction(action + 1)
                      window.location.reload()
                    })
                  }}
                />
                <div className='d-flex gap-2'>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))
        }
      </Accordion>
    </div>
  )
}

export default Setting


