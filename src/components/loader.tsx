import React from "react";
import './css/loader.css';

type MyProps = {
    background: boolean;
}

class Loader extends React.Component<MyProps> {
    render() {
        const {background} = this.props;
        return (
            <React.Fragment>
                <div style={background ? {background: '#a1a1a1', width: '100vw', height: '100%', opacity:0.5, marginLeft: '-10vw'} : {}} className="loading">
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