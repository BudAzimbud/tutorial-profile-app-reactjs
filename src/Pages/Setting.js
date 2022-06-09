import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, FormControl, Form, Accordion } from 'react-bootstrap'
import FormWorkExperience from '../Component/FormWorkExperience';
import Input from '../Component/Input';
import Modal from '../Component/Modal';
import convertToBase64 from '../Helper/convertBase';
function Setting() {
  const [data, setData] = useState({
    profile_picture: ""
  });
  const id = 1

  const update_data = (payload) => {
    axios.patch('http://localhost:3000/profile/' + id, payload).then((res) => {
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
    axios.get('http://localhost:3000/profile/' + id).then((res) => {
      setData(res.data)
    }).catch((err) => {

    })
  }

  const addExperience = (data) => {
    axios.post('http://localhost:3000/work_experience', {
      ...data,
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(data)
      console.log(err.response)
    })
  }

  useEffect(() => {
    getProfile()
  }, [])



  return (
    <div className="container mt-2 ">
      <form onSubmit={onSubmit}
        className='shadow-sm d-flex flex-column gap-4 p-5 '
      >
        <img src={data.profile_picture} style={{ width: 160, height: 130, }} className="border rounded-circle card-img-top mt-2" alt="..." />
        <FormControl placeholder="Name" type="file" onChange={handleFileUpload} />
        <Input label="Name" placeholder="Name" defaultValue={data.name} required />
        <Input label="Age" placeholder="" defaultValue={data.age} required />
        <h5>Work Experience</h5>
        <Modal >
          <FormWorkExperience handleSubmit={(value) => {
            addExperience({ user_id: id, ...value })
          }} />
        </Modal>
        <Accordion >
          {
            data?.work_experience?.map((experience, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{experience.company}</Accordion.Header>
                <Accordion.Body className="d-flex flex-column gap-2">
                  <Input label='Job title' defaultValue={experience.job_title} />
                  <Input label='Company' defaultValue={experience.company} />
                  <Input type="date" label='Start date' defaultValue={new Date(experience.start_date).toLocaleDateString('en-CA')} />
                  <Input type="date" label='End date' />
                  <label>Job Description</label>
                  <Form.Control
                    as="textarea"
                    placeholder="Job Description"
                    style={{ height: '100px' }}
                    onChange={(event) => {

                    }}
                    defaultValue={experience.job_description}
                  />
                  <div>
                    <Button variant="danger" onClick={(event) => {

                    }}>Delete this experience</Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))
          }
        </Accordion>
        <button className='btn btn-primary'>Save</button>
      </form>


    </div>
  )
}

export default Setting


