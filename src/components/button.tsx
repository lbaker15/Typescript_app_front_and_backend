import React from 'react';

type MyState = {}
type MyProps = {
    stringg: string;
    handleClick: () => void;
}
class Button extends React.Component<MyProps> {
    state: MyState = {}
    render() {
        const {stringg, handleClick} = this.props;
        return (
            <React.Fragment>
                <button
                className="submit"
                onClick={handleClick}
                >{stringg}</button>
            </React.Fragment>
        )
    }
}

export default Button;