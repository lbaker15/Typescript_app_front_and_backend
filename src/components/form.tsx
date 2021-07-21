import React, { useState } from "react";
import './form.css';
import TextField from './textFields';
import Button from './button';
import {Redirect} from 'react-router-dom';

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
                <div className="form">
                    <TextField value={username} handleChange={this.handleChange} label='Username' name='username' />
                    <TextField value={password} handleChange={this.handleChange} label='Password' name='password' />
                    <Button handleClick={this.handleSubmit} stringg="Submit" />
                </div>
            </React.Fragment>
        )
    }
}

export default Form;