import React from 'react';

let categories = [
    'food',
    'category 2',
    'category 3'
]
type MyProps = {
    handleCategorySelection: ( e: React.MouseEvent ) => void;
}
class Buttons extends React.Component<MyProps> {
    render() {
        const {handleCategorySelection} = this.props;
        return (
            <React.Fragment>
                {categories.map((x, i) => {
                    return <button
                    key={x + i}
                    value={x}
                    onClick={handleCategorySelection}
                    >{x}</button>
                })}
            </React.Fragment>
        )
    }
}

export default Buttons;