import React from 'react';
import './list.css'
import Map from './map';

class List extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="list">
                    <Map />
                </div>
            </React.Fragment>
        )
    }
}

export default List;