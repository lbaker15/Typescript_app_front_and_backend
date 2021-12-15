import React from 'react';
import '../css/light.css';

type MyState = {
    checked: string;
}
type MyProps = {
    handleSwitch: () => any;
    hideMap: boolean;
}
class Lightswitch extends React.Component<MyProps> {
    render() {
        const {handleSwitch, hideMap} = this.props;
        return (
            <React.Fragment>
                <div>
                    <button  className={hideMap === true ? "div-light black-light" : "div-light white-light"} onClick={handleSwitch}>
                        <div
                        
                        className={hideMap === true ? "light-btn move-light" : "light-btn"}
                        />
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default Lightswitch;