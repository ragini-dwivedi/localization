//Export the App component so that it can be used in index.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from 'axios';

import backendConfig from "../../backendConfig";
import NavBar from "../NavBar";
import '../../App'
import './Community.css';

export default function Community() {

  const [community, setCommunity] = useState('');
  const [communities, setCommunities] = useState([]);

  useEffect(async () => {
    try {
      let result = await axios.get(`${backendConfig}/communities/getCommunities`);
      setCommunities(result.data);
    }catch (e) {
      console.log(e);
    }

  }, []);

  const handleCommunityClick = (e) => {
    let communityObject = communities.find((communityObject)=> {
      return communityObject.community_name === e.target.innerHTML
    });
    setCommunity(communityObject);
  }

  return (
    <div className='parent'>
      <NavBar />
      <Container className="container" style={{background: 'white', marginTop: '2rem'}}>
        <Row>
          <Col className='col-md-3 communties_list'>
            <div>
              <h2> List of communties</h2>
              {
                communities.map((community) => {
                  return (
                    <div onClick={handleCommunityClick} style={{border: 'black solid 1px', padding: '1rem', margin: '1rem', background: '#0d6efd'}}>
                      {community.community_name}
                    </div>
                  )
                })
              }
            </div>
          </Col>  
          <Col className='col-md-2'>
          </Col>
          <Col className='col-md-7 community'>
            {
              community && 
              <div className='community_content'>
                <h2 style={{borderBottom: 'black solid 1px'}}> Community name: {community.community_name} </h2>
                <h2> Location: {community.location} </h2>
                <h2> Number of members: {community.members.length} </h2>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <img src={community.image} width='150px' height='150px' />
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  {
                    community.members.map((member) => {
                      return (
                        <div style={{border: 'black solid 1px', padding: '1rem', margin: '1rem'}}>{member}</div>
                      )
                    })
                  }
                </div>  
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  {
                    community.members.includes(localStorage.getItem('fullName'))?
                    <Button>Leave the community</Button>:
                    <Button>Join the community</Button>
                  }
                </div>
              </div>
            }
          </Col>
        </Row>  
      </Container>
    </div>
  )
}