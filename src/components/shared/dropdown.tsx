import React from 'react';

let categories = [
    'Indian',
    'Chinese',
    'Italian'
]
type MyProps = {
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}
class Dropdown extends React.Component<MyProps> {
    render() {
        const {handleChange, name, value} = this.props;
        return (
            <React.Fragment>
                <div className="col">
                    <label>{name}</label>
                    <select 
                    name={name}
                    style={{
                        outline: 'none',
                        padding: 10,
                        borderRadius: 10,
                        width: 350, 
                        background: 'rgba(236, 236, 236, 0.5)', 
                        border: '1px solid #c3c3c3'}}
                    onChange={handleChange}>
                        <option value={''}>Please select...</option>
                        {categories.map(x => {
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