import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import HeaderImg from './HeaderImg';
const headerImg = require('../img/sig.gif');
import firebase from '../../src/firebase';

const inpStyle = {
  width: '80%',
  fontSize: '1.0em',
  border: 'none',
  borderBottom: '2px solid #000',
  padding: '2%',
};

function SignInDet() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [User, setUser] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      firebase.auth().signInWithEmailAndPassword(Email, Password);
    } catch (err) {
      console.error('this is during SignIn ' + err.message);
    }
  }

  return (
    <Col xs={12} lg={window.innerWidth < 992 ? 12 : 5} style={{ padding: '0' }}>
      <form className="center_Align signInDet" onSubmit={e => handleSubmit(e)}>
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={e => setEmail(e.target.value)}
          onBlur={e => setEmail(e.target.value)}
          name={Email}
          value={Email}
          style={inpStyle}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={e => setPassword(e.target.value)}
          onBlur={e => setPassword(e.target.value)}
          style={inpStyle}
          name={Password}
          value={Password}
        />
        <Button
          type="submit"
          variant="dark"
          style={{
            width: '30%',
            fontSize: '1.0em',
            fontWeight: 'bold',
          }}
        >
          Sign in
        </Button>
      </form>
      {Password}
      {User}
    </Col>
  );
}

function SignIn() {
  return (
    <Row className="height_Onescreen" style={{ margin: '0', padding: '0' }}>
      <HeaderImg headerImg={headerImg} />
      <SignInDet />
    </Row>
  );
}

export default SignIn;
