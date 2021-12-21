import React from 'react';
import Item from './item';

interface Data {
    name: string,
    _id: string,
    author: string, bedrooms: string, propertytype: string,
    businessAddress: string, lat: string, lng: string, photo: string,
    telephone: number;
    price: string;
}
type MyProps = {
    data: Data[], completed: boolean
}
type MyState = {
    highestOrder: Data[]; highest: boolean; lowest: boolean;
    lowestOrder: Data[];
}
class ListAll extends React.PureComponent<MyProps> {
    state: MyState = {
        highest: false, lowest: false,
        highestOrder: [], lowestOrder: []
    }
    handleClick = (e: any) => {
        const {highest, lowest} = this.state;
        const {data} = this.props;
        if (e.target.value === "highest") {
            let highest = [...data].sort((a, b) => {return Number(b.price) - Number(a.price)})
            this.setState({
                highestOrder: highest
            })
        } else {
            let lowest = [...data].sort((a, b) => {return Number(a.price) - Number(b.price)})
            this.setState({
                lowestOrder: lowest
            })
        }
        let curr = (e.target.value === "highest") ? highest : lowest;
        let opposite = (e.target.value === "highest") ? 'lowest' : 'highest';
        this.setState({
            [e.target.value]: !curr,
            [opposite]: false
        })
    }
    render() {
        const {data, completed} = this.props;
        const {highest, lowest, highestOrder, lowestOrder} = this.state;
        console.log(highest, lowest)
        return (
            <React.Fragment>
                <div className="sorting">
                    <div className="flex-col">
                    <button
                    onClick={this.handleClick}
                    value="lowest"
                    className="btn"
                    >Sort Lowest to Highest Price</button>
                    <button
                    onClick={this.handleClick}
                    value="highest"
                    className="btn"
                    >Sort Highest to Lowest Price</button>
                    </div>
                </div>
                <div className="list-all">
                    {(completed && !highest && !lowest) ? data.map(x => {
                        return (
                            <Item x={x} />
                        )
                    })
                    : (highest) ? (
                    
                            highestOrder.map(x => {
                                return (
                                    <Item x={x} />
                                )
                            })
                        
                    ) : ( 
                        lowestOrder.map(x => {
                            return (
                                <Item x={x} />
                            )
                        })
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default ListAll;