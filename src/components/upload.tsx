import React from 'react';

type MyProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: any;
    object: object;
}
class Upload extends React.Component<MyProps> {
    private handleFileInput: React.RefObject<HTMLInputElement>;
    constructor(props: MyProps) {
        super(props);
        this.handleFileInput = React.createRef();
    }
    handleClick = () => {
        if (this.handleFileInput) {
            this.handleFileInput.current?.click()
        }
    }
    render() {
        const {handleChange, value, object} = this.props;
        return (
            <div style={object}>
                <input 
                ref={this.handleFileInput}
                onChange={handleChange}
                type="file" id="actual-btn" hidden/>
                <button 
                onClick={this.handleClick}
                className="uploadBtn">Choose File</button>
                <span id="file-chosen">{(value === '' || value === null || value === undefined) ? "No file chosen" : value.name}</span>
            </div>
        )
    }
}

export default Upload;