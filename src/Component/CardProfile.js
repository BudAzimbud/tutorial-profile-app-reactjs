import React from 'react'
import { Link } from 'react-router-dom'

function CardProfile({ name, bio, id, img }) {
    return (
        <div className="col ">
            <div className="card mt-4 " style={{ width: '12rem', borderRadius: '10%' }}>
                <div className="d-flex justify-content-center">
                    <img src={img} style={{ width: 160, height: 130, }} className="border rounded-circle card-img-top mt-2" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="d-flex justify-content-center card-title">
                        {name}
                    </h5>
                    <small className="d-flex justify-content-center card-title text-secondary text-responsive text-center">
                        {bio}
                    </small>
                    <div className="mt-5">
                        <Link className="d-flex justify-content-center btn btn-primary mt-2" to={"/profile/" + id}>
                            Detail
                        </Link>
                        <div />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProfile