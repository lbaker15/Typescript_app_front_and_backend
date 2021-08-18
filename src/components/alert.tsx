import React from 'react';

type MyProps = {
    alert: string;
    closeAlert: () => void;
}
class Alert extends React.Component<MyProps> {
    private handleFileInput: React.RefObject<HTMLInputElement>;
    constructor(props: MyProps) {
        super(props);
        this.handleFileInput = React.createRef();
    }
    state = {show: false}
    instaShow = () => {
        this.setState({
            show: true
        })
    }
    
    handleClick = () => {
        if (this.handleFileInput) {
            this.handleFileInput.current?.click()
        }
    }
    handleFileChange = (e: any) => {
        console.log(e.target.files[0])
        let file = e.target.files[0];
        let iName = file.name;
        const formData = new FormData();
        formData.append('image', file, iName)
        formData.append('new', 'value')
        setTimeout(() => {
            console.log(file, formData)
            fetch('https://places-find.herokuapp.com/admin/insta-upload', {
                method: 'POST',
                body: formData,
        
            })
            .then(res => res.json()).then(data => console.log(data))
        }, 1000)
    }
    render() {
        const {alert, closeAlert} = this.props;
        const {show} = this.state;
        return (
            <React.Fragment>
                {alert.length === 0 && (
                    <div className="alertBit">
                        <button 
                        onClick={closeAlert} className="alertClose">X</button>
                        <h3>{alert}</h3>

                        <div>
                            <button 
                            className="instagramShare"
                            onClick={this.instaShow}
                            >
                                Share to instagram
                            </button>
                            {show && (
                                <div>
                                    <input 
                                    ref={this.handleFileInput}
                                    onChange={this.handleFileChange}
                                    type="file" id="actual-btn" hidden/>
                                    <button 
                                    onClick={this.handleClick}
                                    className="uploadBtn">Choose File</button>
                                    <span id="file-chosen">No file chosen</span>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default Alert;