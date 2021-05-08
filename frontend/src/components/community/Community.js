//Export the App component so that it can be used in index.js
import NavBar from "../NavBar";
import React, { useEffect, useState } from "react";
import '../../App'
import './Community.css';
import { Container, Row, Col, Button } from "react-bootstrap";

export default function Community() {

  const [community, setCommunity] = useState('');

  let communties = [
    {
      community_name: 'San Jose hikers',
      location: 'San Jose, CA',
      members: ['Aswin Prasad', 'Ragini Dwidedi', 'Bharath'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUArpj2kQywFHKx-h29hUeotlZGb2Q3QX4sA&usqp=CAU'
    }, 
    {
      community_name: 'SFO bikers',
      location: 'San Francisco, CA',
      members: ['Aswin Prasad', 'Ragini Dwidedi', 'Bharath'],
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXOkpFlpXywusVESVsW3Jzev2XcsXQAmunZw&usqp=CAU'
    }, 
    {
      community_name: 'Utah rowers',
      location: 'Salt Lake City, UT',
      members: ['Ragini Dwidedi', 'Bharath'],
      image: 'https://i.natgeofe.com/k/7577bccf-bc12-4df7-ba8c-6fafd6dcd88b/utah-zion.jpg?w=636&h=358'
    }
  ]

  const handleCommunityClick = (e) => {
    let communityObject = communties.find((communityObject)=> {
      return communityObject.community_name === e.target.innerHTML
    });
    setCommunity(communityObject);
  }

  useEffect(() => {
    
  }, [community])

  return (
    <div className='parent'>
      <NavBar />
      <Container className="container" style={{background: 'white', marginTop: '2rem'}}>
        <Row>
          <Col className='col-md-3 communties_list'>
            <div>
              <h2> List of communties</h2>
              {
                communties.map((community) => {
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