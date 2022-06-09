import React, { useState } from 'react'
import Input from './Input'
import { Form, Button } from 'react-bootstrap'
import convertToBase64 from '../Helper/convertBase'
function FormWorkExperience(props) {
    const [data, setData] = useState({
        job_title: null,
        company: null,
        start_date: null,
        end_date: null,
        job_description: null,
        company_logo: null
    })
    const { handleSubmit } = props
    return (
        <>
            <form
                onSubmit={(event) => {
                    handleSubmit(data)
                    console.log(data)
                    event.preventDefault()
                }}
                className='d-flex flex-column gap-2 border p-4'>
                <Input label='Job title' onChange={(event) => setData({ ...data, job_title: event.target.value })} required />
                <Input label='Company' onChange={(event) => setData({ ...data, company: event.target.value })} required />
                <Input type="file" label='Company Logo' onChange={async (event) => {
                    const file = event.target.files[0];
                    const base64 = await convertToBase64(file);
                    setData({ ...data, company_logo: base64 });
                }}
                    required />
                <Input type="date" label='Start date' onChange={(event) => setData({ ...data, start_date: event.target.value })} required />
                <Form.Check
                    type={"checkbox"}
                    label={`Now`}
                    onChange={(event) => {
                        if (data.end_date === "now") {
                            setData({ ...data, end_date: null })

                        } else {
                            setData({ ...data, end_date: 'now' })
                        }
                    }}
                />
                <Input type="date" label='End date' disabled={data.end_date} onChange={(event) => setData({ ...data, end_date: event.target.value })} required />
                <label>Job Description</label>
                <Form.Control
                    as="textarea"
                    placeholder="Job Description"
                    style={{ height: '100px' }}
                    onChange={(event) => setData({ ...data, job_description: event.target.value })}
                    required
                />
                <button className='btn btn-primary'>Add</button>
            </form>
        </>
    )
}

export default FormWorkExperience