import React, { useState, useEffect } from "react";
import { Table, Button } from 'reactstrap';
import { connect } from "react-redux";
import { loadItems, deleteItem, loadLists } from '../../action/ListAction';
import LoadingBar from "../LoadingBar/LoadingBar";
import Popover from "../popover/Popover"
import { formatDate } from '../Utils';
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import AddModal from '../add-modal/AddModal';
import './List.css';
import { Container, Button as Floating, lightColors } from 'react-floating-action-button'
const List = ({ Items, deleteItem, User, LoadingItems, loadLists, ListLoaded, CurrList, loadItems }) => {
    const [addToggler, setAddToggler] = useState(false);
    const [editToggler, setEditToggler] = useState(false);
    const [infoToggler, setInfoToggler] = useState(false);
    const [popoverTarget, setPopoverTarget] = useState("root");
    const [editName, setEditName] = useState("");
    const [editQuantity, setEditQuantity] = useState("");

    const toggleInfo = () => {
        setInfoToggler(!infoToggler);
    }

    useEffect(() => {
        if(User.IsAuth){
            loadItems(CurrList.id);
        }
    }, [CurrList.id]);

    const toggleAdd = () => {
        setAddToggler(!addToggler);
    }

    const toggleEdit = () => {
        setEditToggler(!editToggler);
    }


    if(User.UserData && !ListLoaded){
        loadLists(User.UserData.id)
    }

    if(LoadingItems){
        return <LoadingBar /> 
    }

    return (
        <div>
        <Popover target={popoverTarget} toggler={infoToggler} toggle={toggleInfo}/>
        <AddModal
          modalToggler={addToggler}
          toggle={toggleAdd}
          />
        <AddModal
          modalToggler={editToggler}
          toggle={toggleEdit}
          editName={editName}
          editQuantity={editQuantity}
          />
        <Container>
            <Floating
                    styles={{backgroundColor: lightColors.green}}
                    tooltip="Add New Item!"
                    icon="fas fa-plus"
                    onClick={toggleAdd} />
        </Container>
            <Table hover>
            <thead>
                <tr >
                    <th ><div className="table-element">Edit</div></th>
                    <th ><div className="table-element">Quantity</div></th>
                    <th ><div className="table-element">Product Name</div></th>
                    <th ><div className="table-element">Last Update</div></th>
                    <th ><div className="table-element">Pricing & info</div></th>
                    <th ><div className="table-element">Remove</div></th>
                </tr>
            </thead>
            <tbody>
                {Items.map(({id, date_updated , name, quantity}) => (
                    <tr>
                        <th scope="row">
                            <div className="table-element">
                                <Button color="link"
                                onClick={() =>  {
                                    deleteItem(id)
                                    setEditName(name)
                                    setEditQuantity(quantity)
                                    toggleEdit();
                                  }}>
                                    <i className="fas fa-edit icon-edit"/>
                                </Button>
                            </div>
                        </th>
                        <th >
                            <div className="table-element">
                                <Button color="navy">
                                    {quantity}
                                </Button>
                            </div>
                        </th>
                        <td >
                            <div className="table-element">
                                <Button color="navy">
                                    {name}
                                </Button>
                            </div>
                        </td>
                        <td>
                            <div className="table-element">
                                <Button color="navy">
                                    {formatDate(date_updated)}
                                </Button>
                            </div>
                        </td>
                        <td >
                            <div className="table-element">
                                <Button color="link"
                                  onClick={() => {
                                      setPopoverTarget(name)
                                      toggleInfo()
                                    }}>
                                    <i id={name} className="fas fa-dollar-sign icon-info"/>
                                </Button>
                            </div>
                        </td>
                        <td >
                            <div className="table-element">
                                <Button 
                                  onClick={() =>  {
                                      deleteItem(id);
                                    }}
                                  color="link">
                                    <i className="fas fa-trash-alt icon-remove"/>
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
};

const mapStateToProps = state => ({
    Items: state.Items.Items,
    User: state.User,
    UserLists: state.Items.UserLists,
    LoadingItems: state.Items.LoadingItems,
    ListLoaded: state.Items.ListLoaded,
    CurrList: state.Items.CurrList
  });
  
  export default connect(
    mapStateToProps,
    { deleteItem, loadLists, loadItems }
  )(List);