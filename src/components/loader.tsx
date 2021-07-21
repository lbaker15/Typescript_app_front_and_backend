import React from "react";
import './loader.css';

class Loader extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="loading">
                    <div className="obj"></div>
                    <div className="obj"></div>
                    <div className="obj"></div>
                    <div className="obj"></div>
                    <div className="obj"></div>
                    <div className="obj"></div>
                    <div className="obj"></div>
                    <div className="obj"></div>
                </div>
            </React.Fragment>
        )
    }
}

export default Loader;