import React from 'react'

function NavbarHome() {
    return (
        <div className="row d-flex justify-content-between bg-primary p-2 text-dark bg-opacity-75" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <div className="col-12 col-lg-4 mt-2 mb-2">
                <input type="text" className="form-control" placeholder="Personal description" aria-label="First name" />
            </div>
            <div className="col-12 col-lg-4 mt-2 mb-2">
                <input type="text" className="form-control" placeholder="Location" aria-label="Last name" />
            </div>
            <div className="col-12 col-lg-4 mt-2 mb-2">
                <input type="text" className="form-control" placeholder="Major" aria-label="Last name" />
            </div>
        </div>

    )
}

export default NavbarHome