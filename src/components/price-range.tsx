import React from 'react';
import Dropdown from './shared/dropdown';

type MyProps = {
    price: string;
    handleChange: (e: any) => void;
}
class PriceRange extends React.PureComponent<MyProps> {
    arr = ['0-300pcm', '300pcm-400pcm', '400pcm-500pcm',
    '500pcm-600pcm', '600pcm-700pcm', '700pcm-800pcm',
    '800pcm-900pcm', '900pcm-1000pcm', '1000pcm-1100pcm',
    '1100pcm-1200pcm', '1200pcm-1300pcm', '1300pcm-1400pcm',
    '1400pcm-1500pcm', '1500pcm+']
    render() {
        const {handleChange, price} = this.props;
        return (
            <React.Fragment>
                <Dropdown value={price} name="price" array={this.arr} handleChange={handleChange} />
            </React.Fragment>
        )
    }
}

export default PriceRange;