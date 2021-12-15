import React from 'react';

interface Data {
    name: string,
    _id: string,
    author: string, bedrooms: string, propertytype: string,
    businessAddress: string, lat: string, lng: string, photo: string,
    telephone: number
}
type MyProps = {
    data: Data[], completed: boolean
}
class ListAll extends React.PureComponent<MyProps> {

    render() {
        const {data, completed} = this.props;
        console.log('HERE', data)
        return (
            <React.Fragment>
                <div className="list-all">
                    {completed ? data.map(x => {
                        console.log('X', x)
                        return (
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
                                    </ul>
                            </div>
                        )
                    })
                    : null}
                </div>
            </React.Fragment>
        )
    }
}

export default ListAll;