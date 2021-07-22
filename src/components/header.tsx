import React from "react";
import './header.css';

type MyProps = {
    tabs: [string, string, string];
}
class Header extends React.Component<MyProps> {
    render() {
        const {tabs} = this.props;
        return (
            <React.Fragment>
                <div className="header">
                    {tabs.map(x => {
                        return (
                            <button key={x}>{x}</button>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default Header;