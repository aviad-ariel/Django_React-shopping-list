import React, { useState } from "react";
import './LoginModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { login, loadUser } from "../../action/authAction";
import { connect } from "react-redux";

const LoginModal = ({ modalToggler, toggle, toggleSingUp, login, loadUser, IsAuth, UserData }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    if(IsAuth && !UserData){
        loadUser();
    }

    const onClick = () => {
        const user = {
            "username": username,
            "password": password
        }
        login(user);
        toggle(modalToggler)
    }
    return (
        <div>
            <Modal 
              isOpen={modalToggler} 
              toggle={toggle}
              centered>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                        <Input 
                          onChange={onChangeUsername}
                          type="email"
                          name="email"/>
                    </InputGroup>
                        <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Password</InputGroupAddon>
                        <Input 
                        onChange={onChangePassword}
                          type="password"
                          name="password"/>
                    </InputGroup>
                    <br/> 
                    <Button
                    onClick={onClick}
                    color="secondary"
                    size="md"
                    block>
                        Login
                    </Button>
                </ModalBody>
                <ModalFooter/>  
                <div className="footer">    
                    <Button 
                      color="link"
                      href="#"
                      onClick={toggleSingUp} >
                          Not Register Yet?
                    </Button>
                    <Button 
                      color="link" 
                      href="#" >
                          Forgot Password? 
                    </Button>
                </div>     
            </Modal>
        </div>
    )
};

const mapStateToProps = state => ({
    IsAuth: state.User.IsAuth,
    UserData: state.User.UserData
  });
  
  export default connect(
    mapStateToProps,
    { login, loadUser }
  )(LoginModal);