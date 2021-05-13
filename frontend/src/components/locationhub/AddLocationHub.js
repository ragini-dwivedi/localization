import { useEffect, useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

import backendURL from '../../backendConfig';
import Navbar from '../NavBar';
import './AddLocationHub.css';

const AddLocationHub = (props) => {

  const [name, setLocationHubName] = useState('');
  const [lat, setLocationLatitude] = useState('');
  const [long, setLocationLongitude] = useState('');
  const [dock_count, setActivityCount] = useState('');
  const [show, setShow] = useState(false);

  const onLocationHubCreateClick = async (e) => {
    e.preventDefault();
    let postData = {
      name,
      lat,
      long,
      dock_count
    };
    
    try {
      await axios.post(`${backendURL}/users/createLocationHub`, postData);
      setShow(true);
    }catch(e) {
      alert('Challenge creation failed, see logs');
      console.log(e);
    }
  }

  const onLocationHubNameChange = (e) => {
    setLocationHubName(e.target.value);
  }

  const onLocationLatitudeChange = (e) => {
    setLocationLatitude(e.target.value);
  }

  const onLocationLongitudeChange = (e) => {
    setLocationLongitude(e.target.value);
  }

  const onActivityCountChange = (e) => {
    setActivityCount(e.target.value);
  }

  return (
    <div style={{width: '100%', height: '100vh'}}>
      <Navbar /> 
      <Alert show={show} variant="success">
        <p>
          Location Hub created successful.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
          </Button>
        </div>
      </Alert>
      <div style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', margin: '15% 25% 15% 25%'}}>
        <Form style={{border: 'solid black 2px', padding: '1rem'}}>
          
          <Form.Group controlId="locationHubName">
            <Form.Label>Location Hub Name</Form.Label>
            <Form.Control type="text" placeholder="Enter location hub name" value={name} onChange={onLocationHubNameChange} />
          </Form.Group>
          
          <Form.Group controlId="locationLatitude">
            <Form.Label>Location Latitude </Form.Label>
            <Form.Control type="text" placeholder="Enter location Latitude" value={lat} onChange={onLocationLatitudeChange} />
          </Form.Group>
                    
          <Form.Group controlId="locationLongitude">
            <Form.Label>Location Longitude </Form.Label>
            <Form.Control type="text" placeholder="Enter location Logitude" value={long} onChange={onLocationLongitudeChange} />
          </Form.Group>

          <Form.Group controlId="activityCount">
            <Form.Label>Activity Count</Form.Label>
            <Form.Control type="text" placeholder="Enter Activity Count" value={dock_count} onChange={onActivityCountChange} />
          </Form.Group>

          <Button variant="primary" className="submitButton" type="submit" onClick={onLocationHubCreateClick}>
            Submit
          </Button>

        </Form>
      </div>
    </div>
  );
}

export default AddLocationHub;