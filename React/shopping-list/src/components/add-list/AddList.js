import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from "react-redux";
import { addList, loadItems } from '../../action/ListAction';
import LoadingBar from "../LoadingBar/LoadingBar";

const AddList = ({ modalToggler, toggle, User, addList, Loading }) => {
    const [name, setName] = useState("");

    if(Loading){
        return <LoadingBar/>
    }
    const onChangeName = e => {
        setName(e.target.value)
    }
    const onClick = () => {
        const list = {
            "name": name,
            "owner": User.UserData.id
        }
        addList(list)
        toggle(modalToggler)
    }
    return (
        <div>
            <Modal 
              isOpen={modalToggler} 
              toggle={toggle}
              centered>
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">List Name</InputGroupAddon>
                        <Input 
                          onChange={onChangeName}
                          type="text"
                          name="name"/>
                    </InputGroup>
                    <br/>
                    <Button
                      onClick={onClick}
                      color="secondary"
                      size="md"
                      block>
                        Add List
                    </Button>
                </ModalBody>
                <ModalFooter/>  
                <div className="footer">    
                    <Button 
                      color="link"
                      href="#"
                      >
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
    User: state.User,
    Loading: state.Items.CreatingList
  });
  
  export default connect(
    mapStateToProps,
    { addList }
  )(AddList);