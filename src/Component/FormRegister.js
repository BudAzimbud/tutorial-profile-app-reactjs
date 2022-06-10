import React, { useState } from 'react'
import convertToBase64 from '../Helper/convertBase'

function FormRegister(props) {

    const { handleSubmit } = props

    const [data, setData] = useState()

    return (
        <form onSubmit={(event) => {
            handleSubmit(data)
            event.preventDefault()
        }}>
            <p className="text-center">Register</p>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginName">Email</label>
                <input type="email" id="loginName" className="form-control" required
                    onChange={(event) => {
                        setData({ ...data, email: event.target.value })
                    }}
                />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" >Password</label>
                <input type="password" id="loginPassword" className="form-control" required
                    onChange={(event) => {
                        setData({ ...data, password: event.target.value })
                    }}
                />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" >Name</label>
                <input type="text" id="name" className="form-control" required
                    onChange={(event) => {
                        setData({ ...data, name: event.target.value })
                    }}
                />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" >Birthday</label>
                <input type="date" id="age" className="form-control" required
                    onChange={(event) => {
                        setData({ ...data, age: event.target.value })
                    }}
                />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" >Profile picture</label>
                <input type="file" id="age" className="form-control" required
                    onChange={async (e) => {
                        const file = e.target.files[0];
                        const base64 = await convertToBase64(file);
                        setData({ ...data, profile_picture: base64 });
                    }}
                />
            </div>
            <div >
                <button type="submit" className="btn btn-primary ">Sign up</button>
            </div>
        </form>
    )
}

export default FormRegister