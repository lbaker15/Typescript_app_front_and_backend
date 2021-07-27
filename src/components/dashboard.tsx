import React from "react";
import Header from './header';
import Loader from './loader';
import Search from './search';
import List from './list';
import Buttons from './buttons';
import Wrapper from '../wrapper';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { addMapRedux } from '../actions/map';

type MyState = {
    validated: boolean;
    address: string;
    category: string;
    data: {businessAddress: string; lat: string; lng: string; name: string;}[];
}
type MyProps = {
    map: {map: object};
}
class Dashboard extends React.Component<MyProps> {
    state: MyState = {
        validated: false, address: '', data: [], category: ''
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
        const {address} = this.state;
        let obj = {address, distanceLimit: 100}
        fetch('https://places-find.herokuapp.com/admin/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
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
            //console.log('here',this.props.map.map, )
        })
    }
    handleCategorySelection = (e: React.MouseEvent) => {
        let a = (e.target as any)
        this.setState({
            category: a.value
        })
    }
    render() {
        const {validated, address, data} = this.state;
        if (validated) {
            return (
                <React.Fragment>
                    <Header tabs={['Home', 'Option One', 'Log out']} />
                    <div className="padding">
                        <Wrapper>
                            <Search handleSubmit={this.handleSubmit} 
                            handleChange={this.handleChange} address={address} />
                            <Buttons handleCategorySelection={this.handleCategorySelection} />
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