import React from "react";
import { Redirect } from "react-router-dom";
import './css/header.css';

type MyProps = {
    tabs: [string, string, string];
}
class Header extends React.Component<MyProps> {
    state = {redirect: false, redirectTo: ''}
    redirect = (e: React.MouseEvent) => {
        let btn = e.target as any
        let theStr = String(btn.value).toLocaleLowerCase()
        if (theStr.indexOf(' ') >= 0) {
            let arr = theStr.split(' ');
            let str = new String;
            arr.map(x => {
                str = str + x
            })
            this.setState({
                redirect: true, redirectTo: str
            })
        } else {
            let str = (theStr === 'home') ? 'dashboard' : theStr;
            this.setState({
                redirect: true, redirectTo: str
            })
        }
        
    }
    render() {
        const {tabs} = this.props;
        const {redirect, redirectTo} = this.state;
        console.log(redirectTo)
        return (
            <React.Fragment>
                {redirect && (
                    <Redirect to={'/' + redirectTo} />
                )}
                <div className="header">
                    {tabs.map(x => {
                        return (
                            <button 
                            onClick={this.redirect}
                            value={x}
                            key={x}>{x}</button>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default Header;