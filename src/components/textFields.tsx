import React, { FocusEvent } from "react";
import './form.css';


type MyProps = {
    label: string;
    name: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
type MyState = {
    clicked: boolean;
    invalid: boolean;
}
class TextField extends React.Component<MyProps> { 
    state: MyState = {
        clicked: false,
        invalid: false
    }
    handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        //console.log(e.target.validity.valid)
        const {valid} = e.target.validity;
        this.setState({
            clicked: true,
            invalid: valid
        })
    }
    render() {
        const {label, name, handleChange, value} = this.props;
        const {clicked, invalid} = this.state;
        console.log(invalid)
        return (
            <div className="row">
                <label>
                    {label}
                </label>
                <input 
                style={(clicked) ? (value.length > 0 && invalid) ? {border: '1px solid #00db71'} : {border: '1px solid red'} : {border: '1px solid #c3c3c3'}} 
                onBlur={this.handleBlur}
                type={name === 'password' ? 'password' : (name === 'username') ? 'email' : 'text'}
                name={name} 
                value={value}
                onChange={handleChange} />
                <div 
                style={(value.length === 0 && clicked) ? {display: 'block'} : {display: 'none'}} 
                className="alert">
                    This field is required
                </div>
                <div 
                style={(clicked && value.length > 0 && !invalid) ? {display: 'block'} : {display: 'none'}}
                className="alertInvalid">
                    Please ensure input is in correct format
                </div>
            </div>
        )
    }
}

export default TextField;


// interface Props {
//     label: string;
// }
// export const TextField: React.FC<Props> = ({label}) => {
//     const [count, setCount] = useState();
//     return (
//         <div>
//             <input />
//         </div>
//     );
// };