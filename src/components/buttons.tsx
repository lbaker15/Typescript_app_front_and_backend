import React from 'react';
import {categories} from './shared/data/categories';
import {types} from './shared/data/types';

type MyProps = {
    category: string;
    handleCategorySelection: ( e: React.MouseEvent ) => void;
    bedrooms: boolean;
}
type MyState = {
    open: boolean;
}
class Buttons extends React.Component<MyProps> {
    state: MyState = {
        open: false
    }
    handleClick = () => {
        this.setState((prev: any) => ({
            open: !prev.open
        }))
    }
    render() {
        const {handleCategorySelection, category, bedrooms} = this.props;
        const {open} = this.state;
        let array = (bedrooms) ? categories : types;
        return (
            <React.Fragment>
                <div className="button-col">
                    <button
                    style={{marginTop: 15, display: 'flex', alignItems: 'center'}}
                    className="btn2"
                    onClick={this.handleClick}
                    >
                    {(bedrooms) && (
                        <React.Fragment>
                        <span className="plusSign">+</span> <span>Number of bedrooms</span>
                        </React.Fragment>
                    )}
                    {(!bedrooms) && (
                        <React.Fragment>
                        <span className="plusSign">+</span> <span>Property Type</span>
                        </React.Fragment>
                    )}
                    </button>
                    {open && (
                    <div style={{paddingTop: 15, display: 'flex', flexDirection: 'column', gap: 5}}>
                    {array.map((x, i) => {
                        return <button
                        className={(category === x) ? "btn btn-selected" : "btn "}  
                        key={x + i}
                        name={(bedrooms) ? 'bedrooms' : 'propertytype'}
                        value={x}
                        onClick={handleCategorySelection}
                        >{x}</button>
                    })}
                    </div>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default Buttons;