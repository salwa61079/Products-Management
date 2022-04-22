import React from 'react'
import { Form, Col, Row } from 'react-bootstrap';

export default function FormGroup(props) {
    return (
        <>
            <Form.Group as={props.as} className="mb-3">
                <Form.Label >{props.label}</Form.Label>
                <Form.Control 
                 onChange={props.onChange}
                 id={props.id} 
                 value={props.value} 
                 type={props.type} 
                 placeholder={props.placeholder} 
                 className={props.className}/>
            </Form.Group>
        </>
    )
}
