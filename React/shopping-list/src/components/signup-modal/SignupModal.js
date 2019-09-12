import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { signUp } from '../../action/authAction';
import { connect } from "react-redux";

const SignupModal = ({ modalToggler, toggle, signUp, Loading }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const onChangeEmail = e => {
        setEmail(e.target.value)
    }

    const onSubmit = () => {
        const user = {
            "username": username,
            "email": email,
            "password": password
        }
        signUp(user);
        toggle();
    }
    return (
        <div>
            <Modal 
              isOpen={modalToggler} 
              toggle={toggle}
              centered>
                <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
                <ModalBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Username</InputGroupAddon>
                    <Input type="email" name="username" onChange={onChangeUsername}/>
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                    <Input type="email" name="email" onChange={onChangeEmail}/>
                </InputGroup>
                <br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
                    <Input type="password" name="password" onChange={onChangePassword}/>
                </InputGroup>
                <br/>
                <br/>
                <Button
                  color="secondary"
                  size="md"
                  onClick={onSubmit}
                  block>
                    Sign up
                </Button>
                </ModalBody>
                <ModalFooter/>    
            </Modal>
        </div>
    )
};

const mapStateToProps = state => ({
    IsAuth: state.User.IsAuth,
    Loading: state.User.Loading
  });

export default connect(
    mapStateToProps,
    { signUp }
  )(SignupModal);