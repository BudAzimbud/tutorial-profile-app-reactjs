import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormLogin from "../Component/FormLogin";
import http from "../Helper/http.";

function Login() {

    const history = useNavigate()

    const handleSubmit = (value) => {
        http.get(`profile?email=${value.email}&&password=${value.password}`).then((res) => {
            if (res.data.length > 0) {
                history('/setting')
                localStorage.setItem("profile_id", res.data[0].id)
            } else {
                alert('Your account is wrong')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (localStorage.getItem("profile_id")) {
            history("/")
        }
    }, [history])

    return (
        <div className='d-flex justify-content-center' data-testid="login" >
            <div className="tab-content " style={{ width: "50%" }}>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="/login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="/register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                </ul>
                <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <FormLogin handleSubmit={(value) => handleSubmit(value)} />
                </div>
            </div>
        </div>

    );
}

export default Login;