import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Input from './Input';
function FormUrlShare() {
    const id = localStorage.getItem("profile_id")
    const [urlShare, setUrlShare] = useState()
    const getProfileURL = useCallback(() => {
        axios.get(`${process.env.REACT_APP_URL_BACKEND}/profile_share?user_id=` + id).then((res) => {
            setUrlShare(res.data[0])
        })
    }, [id])
    useEffect(() => {
        getProfileURL()
    }, [id ,getProfileURL])
    return (
        <form onSubmit={(event) => {
            axios.patch(`${process.env.REACT_APP_URL_BACKEND}/profile_share/${urlShare?.id}`, {
                ...urlShare
            }).then((res) => {
                alert('url profile is update')
            })
            event.preventDefault()
        }} className='mt-3 shadow-sm p-4 d-flex flex-column gap-2'>
            <h5>Link Profile</h5>
            <Input label="Cool nickname" defaultValue={urlShare?.nickname}
                onChange={(event) => {
                    const text = event.target.value.replace(/ /g, "");
                    setUrlShare({
                        ...urlShare,
                        url: `${process.env.REACT_APP_URL_FRONTEND}/${text}`,
                        nickname: text
                    })
                }}
                required
            />
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Share for public"
                onChange={(event) => {
                    setUrlShare({ ...urlShare, share: !urlShare.share })
                }}
                checked={urlShare?.share}
            />

            <div>
                <Input label="Copy this url and share to your friend" defaultValue={urlShare?.url} disabled />
                <Button onClick={() => {
                    navigator.clipboard.writeText(urlShare.url)
                    alert('okey you have copy this url')
                }} disabled={!urlShare?.share}> Copy</Button>
            </div>
            <button className="btn btn-primary" >Save</button>
        </form>
    )
}

export default FormUrlShare