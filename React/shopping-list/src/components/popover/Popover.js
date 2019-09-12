import React, { useState, useEffect } from 'react';
import { scrap } from '../../action/ListAction';
import { connect } from 'react-redux';
import { ModalHeader, ModalBody, Modal, Button, ModalFooter, Table } from 'reactstrap';
import LoadingBar from '../LoadingBar/LoadingBar';
import { arrangeData } from '../Utils'
import './popover.css';

const Popover = ({ scrap, Scraping, Info, target, toggler, toggle }) => {
    const query = "https://www.metro.ca/en/online-grocery/search?filter="+target
    useEffect(() => {
        if(toggler){
            scrap(target)
        }
    }, [target])


    if(Scraping){
        return <LoadingBar /> 
    }

    return(
        <Modal 
          isOpen={toggler} 
          toggle={toggle}
          size="lg"
          centered>  
            <ModalHeader toggle={toggle}>
                {target.charAt(0).toUpperCase() + target.slice(1)}
            </ModalHeader>
            <ModalBody>
            <Table hover>
            <thead>
                <tr >
                    <th ><div className="table-element">Brand</div></th>
                    <th ><div className="table-element">Name</div></th>
                    <th ><div className="table-element">Price</div></th>
                </tr>
            </thead>
            <tbody>
                {arrangeData(Info).map((item) => (
                    <tr>
                        <th scope="row">
                            <div className="table-element">
                                {item.brand}
                            </div>
                        </th>
                        <th scope="row">
                            <div className="table-element">
                                {item.item_name}
                            </div>
                        </th>
                        <th scope="row">
                            <div className="table-element">
                                {item.price}
                            </div>
                        </th>
                    </tr>
                ))}
            </tbody>
            </Table>
            </ModalBody>
            <ModalFooter/>  
            <div className="footer">    
                <Button 
                  color="link"
                  href={query}
                  target="_blank">
                      Full Prices And Info
                </Button>
            </div>     
        </Modal>
    )
}

const mapStateToProps = state => ({
    Info: state.Items.Info,
    Scraping: state.Items.Scraping
  });
  
  export default connect(
    mapStateToProps,
    { scrap }
  )(Popover);