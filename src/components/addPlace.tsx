import React from "react";
import './css/dashboard.css';
import TextField from "./shared/textFields";
import Dropdown from "./shared/dropdown";
import Button from "./shared/button";
import {addPlace} from './fetchHelpers/functions';
import Alert from './alert';

type MyState = {
    name: string; telephone: string; 
    address: string; category: string;
    alert: string;
}
class AddPlace extends React.Component {
    state: MyState =  {
        name: '', telephone: '', address: '', category: '', alert: ''
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    } 
    handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () => {
        const {name, telephone, address, category} = this.state;
        if (name.length > 0 && telephone.length > 0 && address.length > 0 && category.length > 0) {
            let obj = {name, telephone: Number(telephone), address, category}
            addPlace(obj).then(data => {
                if (data.Data) {
                    this.setState({
                        alert: 'Place added.'
                    })
                }
            })
        } else {
            this.setState({
                alert: 'Please ensure all inputs are entered correctly before submitting'
            })
        }
    }
    closeAlert = () => {
        this.setState({
            alert: ''
        })
    }
    render() {
        console.log(this.state)
        const {name, telephone, address, category, alert} = this.state;
        return (
            <div style={{height: '90vh'}} className="padding">
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} className="addPlace">
                    <h2>Add Your Own Place</h2>
                    <TextField 
                    label={'name'} 
                    name={'name'}
                    value={name}
                    handleChange={this.handleChange}
                    />
                    <TextField 
                    label={'telephone'} 
                    name={'telephone'}
                    value={telephone}
                    handleChange={this.handleChange}
                    />
                    <TextField 
                    label={'address'} 
                    name={'address'}
                    value={address}
                    handleChange={this.handleChange}
                    />
                    <Dropdown 
                    name={'category'} 
                    value={category}
                    handleChange={this.handleChangeSelect}
                    />
                    <br />
                    <Button stringg={'Submit'} handleClick={this.handleClick} />
                    <Alert alert={alert} closeAlert={this.closeAlert} />
                </div>
            </div>
        )
    }
}

export default AddPlace;
