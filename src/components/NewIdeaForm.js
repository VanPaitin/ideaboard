import React, { useState } from 'react';
import Form from "react-bootstrap/Form";

export default ({ submitData, errors }) => {
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let titleError, bodyError;

  if (errors) {
    titleError = errors.title;
    bodyError = errors.body;
  }

  let handleClick = e => {
    e.preventDefault();

    submitData({ title, body });
  };

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label className={titleError && 'error-input'}>
          { titleError ? `Title ${titleError}` : <b>Title</b> }
        </Form.Label>
        <Form.Control
          className={titleError && 'error-input'}
          type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </Form.Group>
      <button className='dummy-button' style={{ display: 'none'}} onClick={handleClick}/>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className={bodyError && 'error-input'}>
          { bodyError ? `Body ${bodyError}` : <b>Body</b> }
        </Form.Label>
        <Form.Control
          className={bodyError && 'error-input'}
          as="textarea" placeholder="Body" value={body}
          onChange={(e) => setBody(e.target.value)}/>
      </Form.Group>
    </Form>
  )
}
