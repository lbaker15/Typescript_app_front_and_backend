import React from 'react';
import Loader from './loader';
import Button from './shared/button';
import Input from './shared/input';
import Upload from './upload';

type MyProps = {
    alert: string;
    closeAlert: () => void;
}
type MyState = {
    show: boolean; photo: any; 
    password: string; username: string;
    message: string; loader: boolean;
    alert: string;
}
class Alert extends React.Component<MyProps, MyState> {
    private handleFileInput: React.RefObject<HTMLInputElement>;
    constructor(props: MyProps) {
        super(props);
        this.handleFileInput = React.createRef();
    }
    state: MyState = { alert: '', show: false, photo: '', 
    username: '', password: '', message: '', loader: false  }
    instaShow = () => {
        this.setState((prev) => ({
            show: !prev.show
        }))
    }
    handleClick = () => {
        if (this.handleFileInput) {
            this.handleFileInput.current?.click()
        }
    }
    handleFileChange = (e: any) => {
        console.log(e.target.files[0])
        let file = e.target.files[0];
        this.setState({
            photo: file
        })
    }
    handleSubmit = () => {
        const {password, username, message, loader} = this.state;
        let file = this.state.photo;
        let iName = file.name;
        const formData = new FormData();
        formData.append('image', file, iName)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('message', message)
        this.setState({
            loader: true
        })
        setTimeout(() => {
            console.log(file, formData)
            fetch('https://places-find.herokuapp.com/admin/insta-upload', {
                method: 'POST',
                body: formData,
        
            })
            .then(res => res.json()).then(data => {
                if (data.Success) {
                    this.setState({
                        alert: 'Uploaded'
                    })

                } else {
                    this.setState({
                        alert: 'Error'
                    })
                }
                this.setState({
                    loader: false
                })
            })
        }, 1000)
    }
    loginCredentials = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (id === 'username') {
            this.setState((prev) => ({
                username: e.target.value
            }))
        } else if (id === 'message') {
            this.setState((prev) => ({
                message: e.target.value
            }))
        } else {
            this.setState((prev) => ({
                password: e.target.value
            }))
        }
    }
    render() {
        const {alert, closeAlert} = this.props;
        const {show, username, password, message, photo, loader} = this.state;
        console.log(loader)
        return (
            <React.Fragment>
                    {loader && (
                        <Loader background={true} />
                    )}
                    <div className="alertBit">
                        <button 
                        onClick={closeAlert} className="alertClose">X</button>
                        <h3>{alert}</h3>
                        <div>
                            <button 
                            className="instagramShare"
                            onClick={this.instaShow}
                            >
                                Click here to share photo to instagram
                            </button>
                            {show && (
                                <div className="instagramDetails">
                                    <Upload 
                                    handleChange={this.handleFileChange}
                                    value={photo}
                                    object={{}}
                                    />
                                    <br/>
                                    <Input 
                                    label="Instagram username"
                                    id="username"
                                    value={username}
                                    onChange={this.loginCredentials}
                                    />
                                    <Input 
                                    label="Instagram password"
                                    id="password"
                                    value={password}
                                    onChange={this.loginCredentials}
                                    />
                                    <Input 
                                    label="Message"
                                    id="message"
                                    value={message}
                                    onChange={this.loginCredentials}
                                    />
                                    {this.state.alert && (
                                        <h5>{this.state.alert}</h5>
                                    )}
                                    <Button 
                                    specifiedClass="instaSubmit"
                                    handleClick={this.handleSubmit} stringg="Submit" />
                                </div>
                            )}
                        </div>
                    </div>
            </React.Fragment>
        )
    }
}

export default Alert;