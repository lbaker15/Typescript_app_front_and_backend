import React from "react";
import './search.css';


type MyProps = {
    handleSubmit: ( e: React.MouseEvent ) => void;
    handleChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void;
    address: string;
}
class Search extends React.Component<MyProps> {
    
    render() {
        const {handleSubmit, handleChange, address} = this.props;
        return (
            <React.Fragment>
                <div className="search">
                    <input 
                    name="address"
                    onChange={handleChange}
                    value={address}
                    />
                    <button
                    onClick={handleSubmit}
                    >Search</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Search;