import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';


type MyState = {
    redirect: boolean;
}
type MyProps = {}
class Logout extends React.Component<MyProps> {
    state: MyState = {
        redirect: false
    }
    componentDidMount() {
        let name = 'tokenName'; 
        let token = 'null';
        let now = new Date()
        let time = now.getTime()
        now.setTime(time)
        document.cookie = name + "= ;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        this.forceUpdate()
        this.setState({
            redirect: true
        })
    }
    render() {
        const {redirect} = this.state;
        return (
            <React.Fragment>
                {redirect && (
                    <Redirect to="/login" />
                )}
                Logout
            </React.Fragment>
        )
    }
}

export default connect((state) => ({

}))(Logout);