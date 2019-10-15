import React, { Fragment, useState, Component } from 'react';
import { createPortal } from 'react-dom';
import { Button, Card, Modal, Form, Row, Col } from 'react-bootstrap';
import firebase from '../../src/firebase';
import { Router, navigate } from '@reach/router';

const b = {
  fontSize: '1.0em',
  fontWeight: 'bold',
};
const cardSty = {
  width: '18rem',
  margin: '2%',
  border: 'none',
  boxShadow: ' 0px 3px 6px rgba(75, 75, 75, 0.2)',
};
const inpStyle = {
  fontSize: '1.25em',
};
//take Quiz modal component called using portal
class TakeQzModal extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }
  handleSubmit = () => {
    //set state of no fo q,time,name of qz
    //and then post it to server side for creating document in firebase
    //navigate to Questions part
    navigate('/dash/questions');
  };
  render() {
    return createPortal(
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>Qz details</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ b }}>
              <Form.Group as={Row} controlId="formQzName">
                <Form.Label column sm={5} style={inpStyle}>
                  Name of Qz
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    style={inpStyle}
                    type="text"
                    placeholder="Titans"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formNoQuestions">
                <Form.Label column sm={5} style={inpStyle}>
                  Number of Questions
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    style={inpStyle}
                    type="number"
                    min="5"
                    max="30"
                    step="5"
                    placeholder="5-30"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formTimePeriod">
                <Form.Label column sm={5} style={inpStyle}>
                  Time-period between each Question
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="number"
                    style={inpStyle}
                    min="10"
                    max="30"
                    step="10"
                    placeholder="10,20 or 30"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              style={b}
              onClick={this.handleSubmit}
            >
              Start Entering Questions
            </Button>
          </Modal.Footer>
        </Modal>
      </div>,
      this.container,
    );
  }
}
// onClick={this.props.onHide}
// profile component

function Profile({ user }) {
  const [showModal, setShowModal] = useState(false);

  return user.Username ? (
    <Fragment>
      <div className="profileDet">
        <img src={user.avatar} className="profilePic" />
        <div style={{ padding: '4% 0%', textAlign: 'left' }}>
          <h1>@{user.Username}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="profileDet">
        <Card style={cardSty}>
          <Card.Body>
            <Card.Title>
              <h1>{user.qzTaken.length}</h1>
            </Card.Title>
            <Card.Text>Quizzes Taken</Card.Text>
          </Card.Body>
        </Card>
        <Card style={cardSty}>
          <Card.Body>
            <Card.Title>
              <h1>{user.savedQz.length}</h1>
            </Card.Title>
            <Card.Text>Quizzes Saved</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="Btnn">
        <Button
          variant="dark"
          style={b}
          onClick={() => setShowModal(!showModal)}
        >
          Take a quiz
        </Button>

        {showModal && (
          <TakeQzModal show={showModal} onHide={() => setShowModal(false)} />
        )}
        <Button
          variant="outline-dark"
          style={b}
          onClick={() => firebase.auth().signOut()}
        >
          Sign out
        </Button>
      </div>
    </Fragment>
  ) : (
    <h1>Loading...</h1>
  );
}
// {user.savedQz.length}
export default Profile;
