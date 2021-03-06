import React from 'react';
// import {categories} from './data/categories';

// let categories = [
//     '1 bed',
//     '2 bed',
//     '3+ bed'
// ] 
type MyProps = {
    array: string[];
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}
class Dropdown extends React.Component<MyProps> {
    render() {
        const {handleChange, name, value, array} = this.props;
        let priceDropdown = (array[0].includes('pcm')) ? true : false;
        let nameWo = name.slice(1);
        return (
            <React.Fragment>
                <div className={priceDropdown ? "small-col col": "col"}>
                    <label
                    className={(priceDropdown) ? 'font-bold' : ''}
                    >{(priceDropdown) ? name[0].toLocaleUpperCase() + nameWo: name}</label>
                    <select 
                    name={name}
                    style={priceDropdown ? {} : {
                        outline: 'none',
                        padding: 10,
                        borderRadius: 10,
                        width: 350, 
                        background: 'rgba(236, 236, 236, 0.5)', 
                        border: '1px solid #c3c3c3'}}
                    onChange={handleChange}>
                        <option value={''}>Please select...</option>
                        {array.map(x => {
                            return <option key={x} style={{fontFamily: 'Manrope'}} value={x}>{x}</option>
                        })
                        }
                    </select>
                </div>
            </React.Fragment>
        )
    }
}

export default Dropdown;