import React, { SyntheticEvent } from "react";

type Props = {
    handleChange: ( e: SyntheticEvent ) => void;
    distance: number;
}
class Distance extends React.Component<Props> {
    render() {
        const {handleChange, distance} = this.props;
        return (
            <div className="distance">
                <h3>Select Distance</h3>
                <input 
                style={{height: 20}}
                type="range" min="0" max="1000"
                onChange={handleChange}
                />
                <h5>
                {distance} km
                </h5>
            </div>
        )
    }
}

export default Distance;