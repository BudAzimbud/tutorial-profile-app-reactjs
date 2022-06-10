import React, { useState } from 'react'

function FormLogin(props) {

    const { handleSubmit } = props

    const [data, setData] = useState()

    return (
        <form onSubmit={(event) => {
            handleSubmit(data)
            event.preventDefault()
        }}>
            <p className="text-center">Login</p>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginName">Email</label>
                <input type="email" id="loginName" className="form-control" required
                    onChange={(event) => {
                        setData({ ...data, email: event.target.value })
                    }}
                />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="loginPassword" >Password</label>
                <input type="password" id="loginPassword" className="form-control" required
                    onChange={(event) => {
                        setData({ ...data, password: event.target.value })
                    }}
                />
            </div>
            <div >
                <button type="submit" className="btn btn-primary ">Sign in</button>
            </div>
        </form>
    )
}

export default FormLogin