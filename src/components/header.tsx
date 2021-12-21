import React from "react";
import { Redirect } from "react-router-dom";
import './css/header.css';

type MyProps = {

}
class Header extends React.Component<MyProps> {
    state = {redirect: false, redirectTo: '', validated: false}
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
    componentDidMount() {
        setTimeout(() => {
          let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
              if (cookie) {
                  this.setState({
                      validated: true
                  })
              }
        }, 200)
    }
    render() {
        const {redirect, redirectTo, validated} = this.state;
        let tab = (validated)  ? ['Home', 'Add Place', 'Log out'] : ['Home', 'Add Place', 'Login'];
        return (
            <React.Fragment>
                {redirect && (
                    <Redirect to={'/' + redirectTo} />
                )}
                <div className="header">
                    {tab.map(x => {
                        console.log(x)
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