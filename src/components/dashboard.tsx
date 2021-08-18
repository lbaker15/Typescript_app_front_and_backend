import React, { SyntheticEvent } from "react";
import Loader from './loader';
import Search from './search';
import List from './list';
import Buttons from './buttons';
import Distance from './distance';
import Wrapper from '../wrapper';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { addMapRedux } from '../actions/map';
import './css/dashboard.css';
import { search } from "./fetchHelpers/functions";

type MyState = {
    validated: boolean;
    address: string;
    category: string;
    data: {businessAddress: string; lat: string; lng: string; name: string;}[];
    distance: number;
    alert: string;
}
type MyProps = {
    map: {map: object};
}
class Dashboard extends React.Component<MyProps> {
    state: MyState = {
        alert: '', validated: false, address: '', data: [], category: '', distance: 0
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
        if (cookie) {
            this.setState({
                validated: true
            })
        }
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            address: e.target.value
        })
    }
    handleSubmit = () => {
        const {address, category, distance} = this.state;
        let obj = {address, distanceLimit: distance, category}
        if (address.length > 0 && distance > 0 && category.length > 0) {
            search(obj)
            .then(data => {
                if (data.Data.length > 0) {
                    this.setState({
                        data: data.Data
                    })
                    let options = {zoom: 12, center: {lat: Number(this.state.data[0].lat), lng: Number(this.state.data[0].lng)  }} 
                    let map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, options)
                    this.state.data.map(x => {
                        let myLatLng = {lat: Number(x.lat), lng: Number(x.lng)}
                        let marker = new window.google.maps.Marker({
                            position: myLatLng,
                            map: map
                        })
                    })
                } else {
                    let message = 'No places found.'
                    this.setState({
                        alert: message
                    })
                }
            })
        } else {
            let message = (address.length < 1) ? 'Please ensure an address is entered' : (category.length < 1) ? 'Please ensure a category is selected' : 'Please ensure distance is specified'
            this.setState({
                alert: message
            })
        } 
    }
    handleCategorySelection = (e: React.MouseEvent) => {
        let a = (e.target as any)
        this.setState({
            category: a.value
        })
    }
    handleDistanceChange = (e: SyntheticEvent) => {
        let value = (e.target as any)
        this.setState({
            distance: value.value
        })
    }
    render() {
        const {validated, alert, address, data, distance} = this.state;
        if (validated) {
            return (
                <React.Fragment>
                    <div className="padding">
                        <Wrapper>
                            <Search 
                            handleSubmit={this.handleSubmit} 
                            handleChange={this.handleChange} address={address} />
                            <div className="center">
                                <Buttons handleCategorySelection={this.handleCategorySelection} />
                                <Distance distance={distance} handleChange={this.handleDistanceChange} />
                            </div>
                            {alert.length > 0 && (
                                <h5 style={{
                                    paddingTop: 17, marginBottom: -20, fontSize: 18, fontWeight: 600,
                                    fontFamily: 'Manrope', textAlign: 'center'}}>{alert}</h5>
                            )}
                            <List />
                        </Wrapper>
                    </div>
                </React.Fragment>
            )
        } else {
            return <Loader />
        }
    }
}


const mapStateToProps = (state: RootState) => ({
    map: state.reducer
})

export default connect(
    mapStateToProps
)(Dashboard);