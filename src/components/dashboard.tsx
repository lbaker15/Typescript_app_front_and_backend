import React, { SyntheticEvent, Suspense } from "react";
import Search from './search';
import List from './list';
import Buttons from './buttons';
import Distance from './distance';
import Wrapper from '../wrapper';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import { getAll } from "./fetchHelpers/functions";
import { RootState } from '../store';
import { addMapRedux } from '../actions/map';
import './css/dashboard.css';
import { search } from "./fetchHelpers/functions";
import {centerVal} from './centerVal';
import { Redirect } from "react-router";
import Lightswitch from './shared/lightswitch';
import Loader from './loader';
const ListAll = React.lazy(() => import('./listAll'));

interface Data {
    name: string,
    _id: string,
    author: string, bedrooms: string, propertytype: string,
    businessAddress: string, lat: string, lng: string, photo: string,
    telephone: number
}
type MyState = {
    validated: boolean;
    address: string;
    bedrooms: string; propertytype: string;
    data: {businessAddress: string; lat: string; lng: string; name: string; telephone: number, propertytype: string, bedrooms: string}[];
    distance: number;
    alert: string; loader: boolean;
    elapsed: boolean; hideMap: boolean;
    dataList: Data[];
    completed: boolean;
}
type MyProps = {
    map: {map: object};
}
class Dashboard extends React.Component<MyProps> {
    state: MyState = {
        dataList: [], completed: false,
        alert: '', validated: false, address: '', data: [], bedrooms: '', 
        propertytype: '', distance: 0, loader: false, elapsed: false,
        hideMap: false
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
        if (cookie) {
            this.setState({
                validated: true
            })
        }
        setTimeout(() => {
            this.setState({
                elapsed: true
            })
        }, 1000)
        //GET ALL FOR LIST
        getAll()
        .then(data => {
            let d = data.Data
            if (d) {
                this.setState({
                    dataList: []
                })
                d.map((item:any, i:number) => {
                    let {dataList} = this.state;
                    let newData = dataList.concat(item)
                    this.setState({
                        dataList: newData
                    })
                    if (i === d.length - 1) {
                        this.setState({
                            completed: true
                        })
                    }
                })
            }
        })
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            address: e.target.value
        })
    }
    handleSubmit = () => {
        const {address, bedrooms, propertytype, distance} = this.state;
        let obj = {address, distanceLimit: distance, bedrooms: bedrooms.toLocaleLowerCase(), propertytype: propertytype.toLocaleLowerCase()}
        console.log(obj)
        if (address.length > 0) {
            this.setState({loader: true})
            search(obj)
            .then(data => {
                if (data.Data) {
                if (data.Data.length > 0) {
                    console.log('data', data.Data)
                    this.setState({
                        data: data.Data,
                        alert: '',
                        loader: false
                    })
                    let options = {zoom: 12, center: {lat: Number(this.state.data[0].lat), lng: Number(this.state.data[0].lng)  }} 
                    let map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, options)
                    this.state.data.map(x => {
                        let myLatLng = {lat: Number(x.lat), lng: Number(x.lng)}
                        let marker = new window.google.maps.Marker({
                            position: myLatLng,
                            map: map
                        })
                        let bedroomsE = x.bedrooms; let propertytypeE = x.propertytype;
                        let address = x.businessAddress; let name = x.name; let phone = x.telephone;
                        const infowindow = new google.maps.InfoWindow({
                            content: `
                            <div className="info-window">
                                <h2><span>Landlord Name:</span> ${name}</h2>
                                <h2><span>Landlord Number:</span> +44${phone}</h2>
                                <h2><span>Address:</span> ${address}</h2>
                                <h2><span>Bedrooms:</span> ${bedroomsE}</h2>
                                <h2><span>Property type:</span> ${propertytypeE}</h2>
                            </div>`,
                        });
                        marker.addListener("click", () => {
                            map.setZoom(16);
                            map.setCenter(marker.getPosition() as google.maps.LatLng);
                            infowindow.open(marker.get("map"), marker);
                        });
                    })
                } else {
                    let message = 'No places found.'
                    this.setState({
                        alert: message,
                        data: [], loader: false
                    })
                    let options = {zoom: 12, center: centerVal
                    } 
                    let map = new window.google.maps.Map(document.getElementById("map") as HTMLElement, options)
                    this.state.data.map(x => {
                        let myLatLng = {lat: Number(x.lat), lng: Number(x.lng)}
                        let marker = new window.google.maps.Marker({
                            position: myLatLng,
                            map: map
                        })
                    })
                }
                } else {
                    //HANDLE KEY NOT VALID ERROR
                    console.log('error')
                }
            })
        } else {
            this.setState({
                alert: 'Please ensure an address is entered'
            })
        } 
    }
    handleCategorySelection = (e: React.MouseEvent) => {
        let a = (e.target as any)
        this.setState({
            [a.name]: a.value
        })
    }
    handleDistanceChange = (e: SyntheticEvent) => {
        let value = (e.target as any)
        this.setState({
            distance: value.value
        })
    }
    handleSwitch = () => {
        let val = !this.state.hideMap
        this.setState((prev) => ({
            hideMap: val
        }))
    }
    render() {
        const {completed, dataList, hideMap, elapsed, validated, loader, alert, address, data, distance, bedrooms, propertytype} = this.state;
        if (validated) {
            return (
                <React.Fragment>
                    <div style={{height: 'auto', marginTop: 75}} className="padding">
                            {loader && (
                                <Loader background={false} />
                            )}
                            <div className="inner-1">
                                <Lightswitch hideMap={hideMap} handleSwitch={this.handleSwitch} />
                                <span>{hideMap ? 'View Map' : 'View All Properties'}</span>
                            </div>
                            <Search 
                            handleSubmit={this.handleSubmit} 
                            handleChange={this.handleChange} 
                            address={address} /> 
                            <div className="center">
                                <div className="flex-col">
                                    <Buttons bedrooms={true} category={bedrooms} 
                                    handleCategorySelection={this.handleCategorySelection} 
                                    />
                                    <Buttons bedrooms={false} category={propertytype} 
                                    handleCategorySelection={this.handleCategorySelection} 
                                    />
                                </div>
                                <Distance distance={distance} handleChange={this.handleDistanceChange} />
                            </div>
                            {alert.length > 0 && (
                                <h5 style={{
                                    paddingTop: 17, marginBottom: -20, fontSize: 18, fontWeight: 600,
                                    fontFamily: 'Manrope', textAlign: 'center'}}>{alert}</h5>
                            )}
                            {!hideMap ? <List /> : (
                                <Suspense fallback={<Loader background={false} />}>
                                    <ListAll data={dataList} completed={completed} />
                                </Suspense>
                            )}
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <div>
                    {!validated && elapsed && (
                        <Redirect to="/" />
                    )
                    }
                </div>
            )
        }
    }
}


const mapStateToProps = (state: RootState) => ({
    map: state.reducer
})

export default connect(
    mapStateToProps
)(Dashboard);