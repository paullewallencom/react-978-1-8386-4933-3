import React, { useState, useContext, useEffect } from 'react'
import { NavBarContext } from '../../layout'
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import './index.scss'

const LoginForm = (props) => {
  return (
    <Form onSubmit={props.handleFormSubmit}>
      <Form.Group controlId="formLoginEmail">
        <Form.Control name="user" size="sm" type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="formLoginPassword">
        <Form.Control name="password" size="sm" type="password" placeholder="Password" />
      </Form.Group>
      <ButtonToolbar>
        <Button variant="info" size="sm" type="submit">
          Access cool content
        </Button>
      </ButtonToolbar>
    </Form>
  )
}

const CoolContent = (props) => (
    <span>Really cool members' only content just for you {props.username}</span>
)

const Archive = () => {
  // something like useAuthenticatedUser -> like DarkTheme, looks to see if there's a user, otherwise...
	const [authUser, setAuthUser] = useAuthenticatedUser()
	const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem('user'))
  const contextNavBar = useContext(NavBarContext)
  useEffect (() => {
    contextNavBar.searchRef.current.focus();
  }, [])

  const handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    const user = formSubmitEvent.target.elements.user.value;
    const password = formSubmitEvent.target.elements.password.value;
    setAuthUser(user, password);
		let theUser = window.localStorage.getItem("user")
    console.log('submit authUser changed', theUser)
		setLoggedIn(theUser)
  };

  return (
    <Container className="Archive">
      <Row>
        <Col>
          <Card className="h-auto pb-2">
					  <Card.Title>Archive</Card.Title>
            <Card.Body className="py-0 my-0">
						  { loggedIn && JSON.parse(loggedIn) !== '<<noauth>>' ? 
							    <CoolContent username={loggedIn} /> : 
									<>
									  <div>You must be logged in to access members' cool content</div>
					          <LoginForm handleFormSubmit={handleFormSubmit}/>
									</>
							}
            </Card.Body>
					</Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Archive
