import React from 'react';
import { MemoryRouterProps } from 'react-router';

type MyProps = {
    id: string; value: any; label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}
type MyState = {}
class Input extends React.Component<MyProps, MyState> {
    render() {
        const {id, value, onChange, label} = this.props;
        return (
            <React.Fragment>
                <label style={{fontWeight: 500}}>{label} :</label>
                <input 
                id={id} 
                step={id === 'time' ? 1 : '' }
                min={id === 'time' ? 0 : '' }
                type={id === 'time' ? 'number' : 'text'} 
                value={value}
                onChange={(e) => onChange(e, e.target.id)}
                />
            </React.Fragment>
        )
    }
}

export default Input;