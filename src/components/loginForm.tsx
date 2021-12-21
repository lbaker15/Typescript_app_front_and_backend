import React, { useState } from "react";
import './css/form.css';
import TextField from './shared/textFields';
import Button from './shared/button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Wrapper from '../wrapper';
import Blur from './styling/blur';
import Alert from './alert';
import Loader from "./loader";

type MyState = {
    username: string;
    password: string;
    redirect: boolean;
    alert: string;
    loading: boolean;
}
type MyProps = {}
class Form extends React.Component<MyProps> {
    state: MyState = {
        username: '', password: '', loading: false, redirect: false, alert: ''
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        const {username, password} = this.state;
        if (username.length > 0 && password.length > 0) {
            let obj = {email: username, password}
            this.setState({
                loading: true
            })
            fetch('https://places-find.herokuapp.com/admin/get-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((res) => res.json())
            .then(data => {
                console.log('then')
                if (data.Token) {
                    let name = 'tokenName'; 
                    let token = data.Token;
                    let now = new Date()
                    let time = now.getTime()
                    time += 1 * 3600 * 1000
                    now.setTime(time)
                    document.cookie = name + "=" + token + ";expires=" + now.toUTCString() +";path=/";
                    setTimeout(() => {
                        this.setState({
                            redirect: true,
                            loading: false
                        })
                    }, 1000)
                } else {
                    //HANDLE FAILED LOGIN HERE
                    this.setState({
                        loading: false,
                        alert: 'Please ensure login details are correct.'
                    })
                } 
            })
        }
    }
    closeAlert = () => {
        this.setState({
            alert: ''
        })
    }
    render() {
        const {username, password, redirect, alert, loading} = this.state;
        return (
            <React.Fragment>
                {redirect && <Redirect to="/dashboard" />}
                <Wrapper>
                    <div className="form">
                        <div className="formInner">
                            <h1>Please Login Here</h1>
                            <TextField value={username} handleChange={this.handleChange} label='Username' name='username' />
                            <TextField value={password} handleChange={this.handleChange} label='Password' name='password' />
                            <Button 
                            specifiedClass="null"
                            handleClick={this.handleSubmit} stringg="Submit" />
                            {loading && (
                                <Loader background={false} />
                            )}
                            {alert.length > 0 && (
                            <Alert alert={alert} successfulSubmit={false} closeAlert={this.closeAlert} />
                            )}
                        </div>
                        <Blur opacity={0.6} blur={80} left={-100} bottom={-50} right={1} top={1} />
                        <Blur opacity={0.6} blur={80} left={1} right={-50} top={-50} bottom={1} />
                    </div>
                </Wrapper>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({

}))(Form);