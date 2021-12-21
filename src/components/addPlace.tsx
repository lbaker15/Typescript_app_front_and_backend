import React from "react";
import './css/dashboard.css';
import TextField from "./shared/textFields";
import Dropdown from "./shared/dropdown";
import Button from "./shared/button";
import {addPlace} from './fetchHelpers/functions';
import Alert from './alert';
import Upload from './upload';
import {categories} from './shared/data/categories';
import {types} from './shared/data/types';
import Loader from "./loader";


type MyState = {
    name: string; telephone: string; 
    address: string; bedrooms: string;
    alert: string; photo: any; successfulSubmit: boolean;
    propertytype: string; advert: string;
    price: string; loading: boolean;
}
class AddPlace extends React.Component {
    state: MyState =  {
        successfulSubmit: false, photo: '', name: '', 
        telephone: '', address: '', bedrooms: '', 
        alert: '', propertytype: '', advert: '',
        price: '0', loading: false
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    } 
    handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
       let name = e.target.name.toLocaleLowerCase();
       name = name.replace(/ /g, ""); 
        this.setState({
            [name]: e.target.value
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
        let {name, advert, price, telephone, address, bedrooms, photo, propertytype} = this.state;
        let file = photo;

        if (advert.length > 0 && price.length > 0 && propertytype.length > 0 && name.length > 0 && photo && telephone.length > 0 && address.length > 0 && bedrooms.length > 0) {
            let iName = file.name;
            let author = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
            telephone = (telephone.includes(" ")) ? telephone.replace(" ", "") : telephone;
            if (author) {
                let a = (author) ? author[2] : 'null';
                const formData = new FormData();
                formData.append('image', file, iName);
                formData.append('advert', advert);
                formData.append('author', a);
                formData.append('price', price);
                formData.append('name', name); formData.append('telephone', telephone);
                formData.append('address', address); formData.append('bedrooms', bedrooms); 
                formData.append('propertytype', propertytype);    
                    this.setState({
                        loading: true
                    })
                    addPlace(formData).then(data => {
                        if (data.Data) {
                            this.setState({
                                alert: 'Place added.',
                                successfulSubmit: true,
                                loading: false
                            })
                        } else {
                            this.setState({
                                alert: 'Could not be added, please ensure all inputs are entered correctly before submitting',
                                loading: false
                            })
            
                        }
                    })
            } else {
                this.setState({
                    alert: 'Please ensure you are logged in'
                })
            }
        }
        else {
            //Handle no photo here
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
        const {price, advert, name, telephone, address, bedrooms, photo, alert, successfulSubmit, propertytype} = this.state;
        return (
            <div className="padding">
                <div style={{display: 'flex', background: 'rgba(255, 255, 255, 0.05)', flexDirection: 'column', width: '100%', marginTop: '75px', paddingBottom: '75px', height: 'auto', alignItems: 'center', justifyContent: 'center'}} className="addPlace">
                    <h2>Add Your Own Place</h2>
                    <TextField 
                    label={'Landlord name'} 
                    name={'name'}
                    value={name}
                    handleChange={this.handleChange}
                    />
                    <TextField 
                    label={'Landlord telephone'} 
                    name={'telephone'}
                    value={telephone}
                    handleChange={this.handleChange}
                    />
                    <TextField 
                    label={'Property address'} 
                    name={'address'}
                    value={address}
                    handleChange={this.handleChange}
                    />
                    <TextField 
                    label={'Advert Link'} 
                    name={'advert'}
                    value={advert}
                    handleChange={this.handleChange}
                    />
                    <TextField 
                    label={'Price PCM'} 
                    name={'price'}
                    value={price}
                    handleChange={this.handleChange}
                    />
                    <Dropdown 
                    array={categories}
                    name={'Bedrooms'} 
                    value={bedrooms}
                    handleChange={this.handleChangeSelect}
                    />
                    <br />
                    <Dropdown 
                    array={types}
                    name={'Property Type'} 
                    value={propertytype}
                    handleChange={this.handleChangeSelect}
                    />
                    <br />
                    <Upload 
                    object={{marginBottom: 18, marginTop: -10}}
                    handleChange={this.handlePhotoChange}
                    value={photo} />
                    <Button 
                    specifiedClass="null"
                    stringg={'Submit'} handleClick={this.handleClick} />
                    {(alert.length > 0) ? (                  
                        <Alert alert={alert} closeAlert={this.closeAlert} successfulSubmit={successfulSubmit} />
                    ): null}
                    {this.state.loading && (
                        <Loader background={false} />
                    )}
                </div>
            </div>
        )
    }
}

export default AddPlace;
