import React from 'react';

type MyState = {}
type MyProps = {
    stringg: string;
    handleClick: () => void;
    specifiedClass: string;
}
class Button extends React.Component<MyProps> {
    state: MyState = {}
    render() {
        const {stringg, handleClick, specifiedClass} = this.props;
        return (
            <React.Fragment>
                <button
                className={specifiedClass !== "null" ? specifiedClass : "submit"}
                onClick={handleClick}
                >{stringg}</button>
            </React.Fragment>
        )
    }
}

export default Button;