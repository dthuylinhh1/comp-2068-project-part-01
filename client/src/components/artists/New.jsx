import React , { useState, useEffect } from 'react';
import  { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {
  

  const [ inputs, setInputs ] = useState({
    name: '',
    gender: 'MALE',
    dateOfBirth: ''
  });

  const [ redirect, setRedirect ] = useState(false);

  const handleSubmit = async event => {
      event.preventDefault();

      try{
          const resp = await Axios.post('/api/artists', inputs);

          if (resp.status === 200){
              toast("The artist was created successfully", {
                  type: toast.TYPE.SUCCESS
              });
              setRedirect(true);
          }else{
              toast("There was an issue creating the artist",{
                  type: toast.TYPE.ERROR
              });
          }
      }catch (error){
          toast("There was an issue creating the artist",{
              type: toast.TYPE.ERROR
          });
      }
  };

  const handleInputChange = async event => {
      event.persist();

      const {name,value} = event.target;

      setInputs(inputs => ({
          ...inputs,
          [name] :value
      }));
  };

  if (redirect) return <Redirect to="/artists"/>;
  return (
    <Container className="my-5">
      <header>
        <h1>New Artist</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              onChange={handleInputChange}
              value={inputs.name}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Gender:</Form.Label>
            <Form.Control
                as="select"
                name="gender"
                onChange={handleInputChange}
                defaultValue={inputs.gender || 'MALE'}
            >  
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
            </Form.Control> 
        </Form.Group>

        <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={handleInputChange}
              value={inputs.dateOfBirth}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Create</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default New;