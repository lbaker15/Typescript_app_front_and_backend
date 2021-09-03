import React, { useState } from "react";
import './css/form.css';
import TextField from './shared/textFields';
import Button from './shared/button';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Wrapper from '../wrapper';
import Blur from './styling/blur';

type MyState = {
    username: string;
    password: string;
    redirect: boolean;
}
type MyProps = {}
class Form extends React.Component<MyProps> {
    state: MyState = {
        username: '', password: '', redirect: false,
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        const {username, password} = this.state;
        if (username.length > 1 && password.length > 1) {
            let token = '1234'; let name = 'tokenName'; 
            let now = new Date()
            let time = now.getTime()
            time += 1 * 3600 * 1000
            now.setTime(time)
            document.cookie = name + "=" + token + ";expires=" + now.toUTCString() +";path=/";
            setTimeout(() => {
                this.setState({
                    redirect: true
                })
            }, 1000)
        }
    }
    render() {
        const {username, password, redirect} = this.state;
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