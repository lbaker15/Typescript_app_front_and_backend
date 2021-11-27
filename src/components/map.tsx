import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { addMapRedux } from '../actions/map';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MyState, reducer } from "../reducers";
import { RootState } from '../store';
import {centerVal} from './centerVal';

let key = 'AIzaSyCNxlh-79Og3dQ_tYpV_Vzlkx3kAPyZ6HI';
const loader = new Loader({
  apiKey: key,
  version: "weekly",
});

type MyProps = {
    addMapRedux: Function;
}
class Map extends React.Component<MyProps> {
    componentDidMount() {
        loader.load().then(() => {
            setTimeout(() => {
                let map = new window.google.maps.Map( document.getElementById("map") as HTMLElement, {
                    center: centerVal,
                    zoom: 14,
                });
                console.log('MAP', map)
                this.props.addMapRedux(map)
            }, 200)
        });
    }
    render() {
        console.log(this.props, this.state)
        return (
            <React.Fragment>
                <div className="mapContainer">
                    <div 
                    style={{width: 500, height: 500}}
                    id="map">
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    map: state.reducer
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    addMapRedux: (map: object) => dispatch(addMapRedux(map))
})
  
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Map)