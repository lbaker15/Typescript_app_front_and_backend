import React from "react";
import Header from './header';
import Loader from './loader';

type MyState = {
    validated: boolean;
}
type MyProps = {}
class Dashboard extends React.Component<MyProps> {
    state: MyState = {
        validated: false
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
        if (cookie) {
            this.setState({
                validated: true
            })
        }
    }
    render() {
        const {validated} = this.state;
        if (validated) {
            return (
                <React.Fragment>
                    <Header tabs={['Home', 'Option One', 'Log out']} />
                </React.Fragment>
            )
        } else {
            return <Loader />
        }
    }
}

export default Dashboard;