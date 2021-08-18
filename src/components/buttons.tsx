import React from 'react';

let categories = [
    'Indian',
    'Chinese',
    'Italian'
]
type MyProps = {
    handleCategorySelection: ( e: React.MouseEvent ) => void;
}
class Buttons extends React.Component<MyProps> {
    render() {
        const {handleCategorySelection} = this.props;
        return (
            <React.Fragment>
                <div style={{paddingTop: 15}}>
                {categories.map((x, i) => {
                    return <button
                    className="btn"
                    key={x + i}
                    value={x}
                    onClick={handleCategorySelection}
                    >{x}</button>
                })}
                </div>
            </React.Fragment>
        )
    }
}

export default Buttons;