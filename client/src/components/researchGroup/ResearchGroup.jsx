import React from 'react'
import { BsSearch } from "react-icons/bs";
import { Form, Col, Row } from 'react-bootstrap';

export default function ResearchGroup(props) {
  return (
    <div className="searchDiv">
        <Form >
          <Row>
          <Form.Group as={Col} className="mb-3" >
            <Form.Control style={{ width: "350px", height: "45px", marginLeft: "20px" }}
              placeholder={props.placeholder}
              onChange={props.onChange} />
          </Form.Group>

          <Form.Group as={Col}>
            <button className='iconSearch'  >
              <BsSearch align="center" size='25px'  />
            </button>
          </Form.Group>
          </Row>
        </Form>
      </div>
  )
}
