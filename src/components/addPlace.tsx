import React from "react";
import './css/dashboard.css';
import TextField from "./shared/textFields";
import Dropdown from "./shared/dropdown";
import Button from "./shared/button";
import {addPlace} from './fetchHelpers/functions';
import Alert from './alert';
import Upload from './upload';

type MyState = {
    name: string; telephone: string; 
    address: string; category: string;
    alert: string; photo: any;
}
class AddPlace extends React.Component {
    state: MyState =  {
        photo: '', name: '', telephone: '', address: '', category: '', alert: ''
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    } 
    handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            this.setState({
                photo: e.target.files[0]
            })
        }
    }
    handleClick = () => {
        const {name, telephone, address, category, photo} = this.state;
        let file = photo;
        let iName = file.name;
        const formData = new FormData();
        formData.append('image', file, iName)
        formData.append('name', name); formData.append('telephone', telephone);
        formData.append('address', address); formData.append('category', category);
       
        if (name.length > 0 && photo && telephone.length > 0 && address.length > 0 && category.length > 0) {
            //let obj = {name, telephone: Number(telephone), address, category}
            addPlace(formData).then(data => {
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
        const {name, telephone, address, category, photo, alert} = this.state;
        console.log('cherker', alert.length > 0)
        return (
            <div style={{height: '100vh'}} className="padding">
                <div style={{display: 'flex', background: 'rgba(255, 255, 255, 0.05)', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} className="addPlace">
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
                    <Upload 
                    object={{marginBottom: 18, marginTop: -10}}
                    handleChange={this.handlePhotoChange}
                    value={photo} />
                    <Dropdown 
                    name={'category'} 
                    value={category}
                    handleChange={this.handleChangeSelect}
                    />
                    <br />
                    <Button 
                    specifiedClass="null"
                    stringg={'Submit'} handleClick={this.handleClick} />
                    {(alert.length > 0) ? (                  
                        <Alert alert={alert} closeAlert={this.closeAlert} />
                    ): null}
                </div>
            </div>
        )
    }
}

export default AddPlace;
