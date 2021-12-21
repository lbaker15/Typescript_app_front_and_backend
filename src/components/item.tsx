import React from 'react';

interface Data {
    name: string,
    _id: string,
    author: string, bedrooms: string, propertytype: string,
    businessAddress: string, lat: string, lng: string, photo: string,
    telephone: number;
    price: string;
}
type MyProps = {
    x: Data;
}
class Item extends React.Component<MyProps> {
    render() {
        const {x} = this.props;
        return (
            <React.Fragment>
                            <div className="list-all-item" key={x._id}>
                                {x.photo && (
                                <div
                                style={{backgroundImage: `url(${x.photo})`}}
                                ></div>
                                )}
                                    <ul>
                                        <li> <span>Landlord Name</span> {x.name}</li>
                                        <li> <span>Landlord Phone</span> +44{x.telephone}</li>
                                        <li> <span>Property Address</span> {x.businessAddress}</li>
                                        <li> <span>Bedrooms</span> {x.bedrooms}</li>
                                        <li> <span>Property Type</span> {x.propertytype}</li>
                                        <li> <span>Price</span> {x.price}</li>
                                    </ul>
                            </div>
            </React.Fragment>
        )
    }
}

export default Item;