import React from 'react';
import Buttons from './buttons';
import Distance from './distance';
import PriceRange from './price-range';

type MyProps = {
    price: string;
    distance: number;
    hideMap: boolean;
    handleCategorySelection: (e: any) => void;
    handleChange: (e: any) => void;
    handleDistanceChange: (e: any) => void;
    bedrooms: string;
    propertytype: string;
}
class Interface extends React.Component<MyProps> {
    render() {
        const {price, distance, hideMap, handleCategorySelection, 
            handleChange, handleDistanceChange, bedrooms, 
            propertytype} = this.props;
        return (
            <React.Fragment>
                                <div className="flex-col-2">
                                    <Buttons bedrooms={true} category={bedrooms} 
                                    handleCategorySelection={handleCategorySelection} 
                                    />
                                    <Buttons bedrooms={false} category={propertytype} 
                                    handleCategorySelection={handleCategorySelection} 
                                    />
                                   
                                </div>
                                <div className="flex-col padding-to">
                                    <PriceRange price={price} handleChange={handleChange} />
                                </div>
                                <Distance distance={distance} handleChange={handleDistanceChange} />
            </React.Fragment>
        )
    }
}

export default Interface;