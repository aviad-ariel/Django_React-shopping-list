import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownToggle, DropdownItem, InputGroupButtonDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from "react-redux";
import { addItem } from '../../action/ListAction';
import LoadingBar from "../LoadingBar/LoadingBar";

const AddModal = ({ modalToggler, toggle, UserLists, addItem, CurrList, editName, editQuantity }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [list, setList] = useState(CurrList.id);
    const [listName, setListName] = useState(CurrList.name);
    const [listToggler, setListToggler] = useState(false);

    const toggleList = () => {
        setListToggler(!listToggler);
    }
    const onChangeUsername = e => {
        setName(e.target.value)
    }

    const onChangePassword = e => {
        setQuantity(e.target.value)
    }

    const onClick = () => {
        const item = {
            "name": name,
            "quantity": quantity,
            "shopping_list": list
        }
        addItem(item)
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
                        <InputGroupAddon addonType="prepend">Item Name</InputGroupAddon>
                        <Input 
                          placeholder={editName}
                          onChange={onChangeUsername}
                          type="text"
                          name="name"/>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Quantity</InputGroupAddon>
                        <Input 
                            placeholder={editQuantity}
                            onChange={onChangePassword}
                            type="number"
                            name="quantity"/>
                        <InputGroupButtonDropdown addonType="append" isOpen={listToggler} toggle={toggleList}>
                            <DropdownToggle caret>
                                {listName}
                            </DropdownToggle>
                            <DropdownMenu>
                                {UserLists.map(({name , id}) => (
                                    <DropdownItem
                                    onClick={() => {
                                        setList(id)
                                        setListName(name)}}>
                                        {name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </InputGroupButtonDropdown>
                    </InputGroup>
                    <br/> 
                    <Button
                      onClick={onClick}
                      color="secondary"
                      size="md"
                      block>
                        Add
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
    UserLists: state.Items.UserLists,
    CurrList: state.Items.CurrList
  });
  
  export default connect(
    mapStateToProps,
    { addItem }
  )(AddModal);