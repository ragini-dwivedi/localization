import { useEffect, useState } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';

import backendURL from '../../backendConfig';
import Navbar from '../NavBar';
import './AddChallenge.css';

const AddChallenge = (props) => {

  const [challengeName, setChallengeName] = useState('');
  const [challengeType, setChallengeType] = useState('running');
  const [challengeLocation, setChallengeLocation] = useState('san jose, ca');
  const [challengeParticipants, setChallengeParticipants] = useState([]);
  const [participantsList, setParticipantsList] = useState([]);
  const [show, setShow] = useState(false);
  

  useEffect(async () => {
    try {
      let result = await axios.get(`${backendURL}/users`);
      let users_list = []
      for (let i = 0; i < result.data.length; i++) {
        users_list.push({email: result.data[i].email, name: result.data[i].fullName});
      }
      setParticipantsList(users_list);
    } catch(e) {
      console.log(e);
    }
  }, []);

  const onChallengeNameChange = (e) => {
    setChallengeName(e.target.value);
  }

  const onChallengeTypeChange = (e) => {
    setChallengeType(e.target.value);
  }

  const onChallengeLocationChange = (e) => {
    setChallengeLocation(e.target.value);
  }

  const onChallengeParticipantsChange = (e) => {
    // console.log(e.target.selectedOptions); This contains an array of selected options.
    let selected_values = []
    for (let i = 0; i < e.target.selectedOptions.length ; i++) {
      selected_values.push(e.target.selectedOptions[i].value);
    }
    setChallengeParticipants(selected_values);
  }

  const onChallengeCreateClick = async (e) => {
    e.preventDefault();
    let postData = {
      challengeName,
      challengeType,
      challengeLocation,
      challengeParticipants: challengeParticipants
    };
    
    try {
      await axios.post(`${backendURL}/users/createChallenge`, postData);
      setShow(true);
    }catch(e) {
      alert('Challenge creation failed, see logs');
      console.log(e);
    }
  }

  return (
    <div style={{width: '100%', height: '100vh'}}>
      <Navbar /> 
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Challenge created successful, all users were notified instantly.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
      <div style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', margin: '15% 25% 15% 25%'}}>
        <Form style={{border: 'solid black 2px', padding: '1rem'}}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Challenge Name</Form.Label>
            <Form.Control type="text" placeholder="Enter challenge name" value={challengeName} onChange={onChallengeNameChange} />
          </Form.Group>

          <Form.Group controlId="formChallengeType">
            <Form.Label>Challenge Type</Form.Label>
            <Form.Control as="select" value={challengeType} onChange={onChallengeTypeChange}>
              <option value='running'>Running</option>
              <option value='swimming'>Swimming</option>
              <option value='cycling'>Cycling</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formChallengeLocation">
            <Form.Label>Challenge Type</Form.Label>
            <Form.Control as="select" value={challengeLocation} onChange={onChallengeLocationChange}>
              <option value='san jose, ca'>San Jose, CA</option>
              <option value='sfo, ca'>San Francisco, CA</option>
              <option value='slc, ut'>Salt Lake City, UT</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Select users to challenge</Form.Label>
            <Form.Control as="select" multiple  onChange={onChallengeParticipantsChange} value={challengeParticipants} style={{maxHeight: '5rem'}}>
              {
                participantsList.map((user) => {
                  return (<option value={user.email}>{user.name}</option>);
                })
              }
            </Form.Control>
            <Form.Text className="text-muted">
              These users will be notified instantly.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={onChallengeCreateClick}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddChallenge;