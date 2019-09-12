import React, { useState, useEffect } from "react";
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LoginModal from '../login-modal/LoginModal';
import SignupModal from '../signup-modal/SignupModal';
import { loadUser, logout } from "../../action/authAction";
import { loadItems, changeList } from "../../action/ListAction";
import { connect } from "react-redux";
import LoadingBar from "../LoadingBar/LoadingBar";
import AddList from "../add-list/AddList";
import './Navibar.css';

const Navibar = ({ changeList, loadUser, logout, loadItems, IsAuth, Loading, UserData, UserLists, ListLoaded, ItemsLoaded, CurrList }) => {
    const[loginToggler, setLoginToggler] = useState(false);
    const[navbarToggler, setNavbarToggler] = useState(false);
    const[signupToggler, setSignupToggler] = useState(false);
    const[dropdownToggler, setDropdownToggler] = useState(false);
    const[addListToggler, setAddListToggler] = useState(false);

    useEffect(() => loadUser(),[])
    useEffect(() =>{
        if(ListLoaded && !ItemsLoaded){
            loadItems(UserLists[0].id)
            changeList({
                name: UserLists[0].name,
                id: UserLists[0].id
            })
        }
    }, [ListLoaded]);

    if(Loading){
       return <LoadingBar />
    }

    const logoutUser = () => {
        logout();
        localStorage.removeItem("Token");
    }

    const toggleLogin = () => {
        if(!IsAuth && !UserData){
            setLoginToggler(!loginToggler);
        }
    }

    const toggleAddList = () => {
        setAddListToggler(!addListToggler);
    }

    const toggleNavbar = () => {
        setNavbarToggler(!navbarToggler);
    }

    const toggleSignUp = () => {
        setSignupToggler(!signupToggler);
    }
    
    const toggleDropdown = () => {
        setDropdownToggler(!dropdownToggler);
    }

    const auth = () => {
        if(!IsAuth){
            return (
                <Nav navbar>
                    <NavItem>
                        <NavLink 
                        href="#"
                        onClick={toggleLogin}>
                            Login 
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink 
                        href="#"
                        onClick={toggleSignUp}>
                            SingUp 
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://www.linkedin.com/in/aviad-ariel-3372ba15b/" target="_blank">About</NavLink>
                    </NavItem>
                </Nav>
            )
        }
        else {
            return (
                <Nav navbar>
                    <NavItem>
                        <NavLink 
                        href="#"
                        onClick={logoutUser}>
                            Logout 
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://www.linkedin.com/in/aviad-ariel-3372ba15b/" target="_blank">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <Dropdown 
                          className="lists"
                          group 
                          isOpen={dropdownToggler} 
                          size="md" 
                          toggle={toggleDropdown} 
                          >
                            <DropdownToggle className="table-element" color="success" caret>
                                {CurrList.name}
                            </DropdownToggle>
                            <Button 
                            onClick={toggleAddList}
                            color="success">
                                <i class="fas fa-plus-square fa-2x"/>
                            </Button>
                            <DropdownMenu className="items">
                            {UserLists.map(({id, owner, name}) =>(
                                <DropdownItem 
                                key={id}
                                onClick= {() =>  {
                                    loadItems(id)
                                    changeList({name:name, id:id})
                                    }}>
                                    {name}
                                </DropdownItem>
                            ))}
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                </Nav>
            )
        }
    };

    return (
        <div>
            <AddList
                modalToggler={addListToggler}
                toggle={toggleAddList}
            />
            <LoginModal 
              modalToggler={loginToggler}
              toggle={toggleLogin}
              toggleSingUp={toggleSignUp}/>
            <SignupModal 
              modalToggler={signupToggler}
              toggle={toggleSignUp}/>

            <Navbar color="light" light expand="md">
                <NavbarBrand> Shopping List </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar}></NavbarToggler>
                <Collapse color="dark" isOpen={navbarToggler} navbar>
                    {auth()}
                </Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = state => ({
    IsAuth: state.User.IsAuth,
    UserData: state.User.UserData,
    Loading: state.User.Loading,
    UserLists: state.Items.UserLists,
    ListLoaded: state.Items.ListLoaded,
    ItemsLoaded: state.Items.ItemsLoaded,
    CurrList: state.Items.CurrList
  });
  
  export default connect(
    mapStateToProps,
    { loadUser, logout, loadItems, changeList }
  )(Navibar);