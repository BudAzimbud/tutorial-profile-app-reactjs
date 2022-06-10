import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormControl, Accordion, Button } from 'react-bootstrap'
import FormWorkExperience from '../Component/FormWorkExperience';
import Input from '../Component/Input';
import Modal from '../Component/Modal';
import convertToBase64 from '../Helper/convertBase';
import FormUrlShare from '../Component/FormUrlShare';
function Setting() {
  const [data, setData] = useState({
  });
  const [experience, setExperience] = useState([]);
  const [action, setAction] = useState(0)
  const id = localStorage.getItem("profile_id")

  const update_data = (payload) => {
    axios.patch(`${process.env.REACT_APP_URL_BACKEND}/profile/` + id, payload).then((res) => {
      console.log(res)
      alert('Profile is update')
    })
  }

  const onSubmit = (event) => {
    update_data(data)
    event.preventDefault()
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setData({ ...data, profile_picture: base64 });
  };

  const getProfile = () => {
    axios.get(`${process.env.REACT_APP_URL_BACKEND}/profile/` + id).then((res) => {
      setData(res.data)
    }).catch((err) => {

    })
  }

  const addExperience = (data) => {
    axios.post(`${process.env.REACT_APP_URL_BACKEND}/work_experience`, {
      ...data,
    }).then((res) => {
    }).catch((err) => {
      console.log(data)
      console.log(err.response)
    })
  }

  const getWorkExperience = (data) => {
    axios.get(`${process.env.REACT_APP_URL_BACKEND}/work_experience?user_id=` + id).then((res) => {
      setExperience(res.data)
    })
  }



  useEffect(() => {
    getProfile()
    getWorkExperience()

  }, [action])



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
          addExperience({ user_id: id, ...value })
          setAction(action + 1)
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
                    axios.patch(`${process.env.REACT_APP_URL_BACKEND}/work_experience/${experience.id}`, {
                      ...value
                    }).then((res) => {
                      alert('work experience is updated')
                    }).catch((err) => {
                      console.log(err)
                    })
                  }}
                  onDelete={(event) => {
                    axios.delete(`${process.env.REACT_APP_URL_BACKEND}/work_experience/` + experience.id).then((res) => {
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


