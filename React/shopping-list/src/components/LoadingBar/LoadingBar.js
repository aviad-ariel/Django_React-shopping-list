import React from "react";
import { Spinner } from 'reactstrap';
import './LoadingBar.css'

const LoadingBar = () => {
    return (
        <div id="spinner-container">
            <Spinner type="grow" color="success" center/>
        </div>
        
    )
}

export default LoadingBar;