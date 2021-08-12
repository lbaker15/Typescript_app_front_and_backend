import React, { SyntheticEvent } from "react";

type Props = {
    handleChange: ( e: SyntheticEvent ) => void;
}
class Distance extends React.Component<Props> {
    render() {
        const {handleChange} = this.props;
        return (
            <div>
                <input type="range" min="0" max="1000"
                onChange={handleChange}
                />
            </div>
        )
    }
}

export default Distance;