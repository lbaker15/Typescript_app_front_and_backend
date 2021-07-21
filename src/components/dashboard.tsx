import React from "react";
import Header from './header';
import Loader from './loader';
import Search from './search';

type MyState = {
    validated: boolean;
    address: string;
}
type MyProps = {}
class Dashboard extends React.Component<MyProps> {
    state: MyState = {
        validated: false, address: ''
    }
    componentDidMount() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'tokenName' + '=([^;]+)'));
        if (cookie) {
            this.setState({
                validated: true
            })
        }
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            address: e.target.value
        })
    }
    handleSubmit = () => {
        const {address} = this.state;
        let obj = {address, distanceLimit: 100}
        fetch('https://places-find.herokuapp.com/admin/places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    render() {
        const {validated, address} = this.state;
        console.log(address)
        if (validated) {
            return (
                <React.Fragment>
                    <Header tabs={['Home', 'Option One', 'Log out']} />
                    <Search handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange} address={address} />
                </React.Fragment>
            )
        } else {
            return <Loader />
        }
    }
}

export default Dashboard;