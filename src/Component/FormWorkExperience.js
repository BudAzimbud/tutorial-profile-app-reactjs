import React, { useState } from 'react'
import Input from './Input'
import { Form } from 'react-bootstrap'
import convertToBase64 from '../Helper/convertBase'
function FormWorkExperience(props) {
    const { handleSubmit, defaultValue } = props
    const [data, setData] = useState({
        job_title: defaultValue?.job_title,
        company: defaultValue?.company,
        start_date: defaultValue?.start_date,
        end_date: defaultValue?.end_date,
        job_description: defaultValue?.job_description,
        company_logo: defaultValue?.company_logo
    })
    return (
        <>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    if (new Date(data.start_date).getFullYear() > new Date().getFullYear()) {
                        alert('Please input less date now')
                        return
                    }
                    if (data.end_date !== "now") {
                        if (new Date(data.end_date).getFullYear() < new Date(data.start_date).getFullYear()) {
                            alert('Please input more start date')
                            return
                        }
                    }
                    console.log(data)
                    handleSubmit(data)
                }}
                className='d-flex flex-column gap-2 border p-4'>
                <Input label='Job title' onChange={(event) => setData({ ...data, job_title: event.target.value })} defaultValue={defaultValue?.job_title} required />
                <Input label='Company' onChange={(event) => setData({ ...data, company: event.target.value })} defaultValue={defaultValue?.company} required />
                <Input type="file" label='Company Logo'
                    onChange={async (event) => {
                        const file = event.target.files[0];
                        const base64 = await convertToBase64(file);
                        setData({ ...data, company_logo: base64 });
                    }}
                    required={!defaultValue} />
                <Input type="date" label='Start date' onChange={(event) => setData({ ...data, start_date: event.target.value })} defaultValue={defaultValue?.start_date ? new Date(defaultValue?.start_date)?.toISOString().split('T')[0] : null} required />
                <Form.Check
                    type={"checkbox"}
                    label={`Now`}
                    checked={data.end_date === "now"}
                    onChange={(event) => {
                        if (data.end_date === "now") {
                            setData({ ...data, end_date: null })
                        } else {
                            setData({ ...data, end_date: 'now' })
                        }
                    }}
                />
                <Input type="date" label='End date' disabled={!defaultValue && data.end_date === "now"} onChange={(event) => setData({ ...data, end_date: event.target.value })} defaultValue={defaultValue?.end_date === "now" ? null : defaultValue?.end_date ? new Date(defaultValue?.end_date)?.toISOString().split('T')[0] : null} required />
                <label>Job Description</label>
                <Form.Control
                    as="textarea"
                    placeholder="Job Description"
                    style={{ height: '100px' }}
                    onChange={(event) => setData({ ...data, job_description: event.target.value })}
                    defaultValue={defaultValue?.job_description}
                    required
                />
                <button className='btn btn-primary'>Save</button>
                {defaultValue && (
                    <button onClick={props.onDelete} className='btn btn-danger'>Delete</button>
                )}
            </form>
        </>
    )
}

export default FormWorkExperience