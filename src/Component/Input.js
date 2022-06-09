import React from 'react'
import { FormControl } from 'react-bootstrap'

function Input(props) {
    return (
        <div>
            <label>{props.label}</label>
            <FormControl {...props} />
        </div>
    )
}

export default Input