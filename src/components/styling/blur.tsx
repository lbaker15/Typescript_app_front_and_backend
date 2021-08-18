import React from 'react';

type MyProps = {
  opacity: number; blur: number; left: number; right: number; bottom: number; top: number;
}
//Style component, if top is set to 1 - style uses bottom, if left is set to 1 - style uses right
class Blur extends React.Component<MyProps> {
    render() {
        const {opacity, blur, left, top, bottom, right} = this.props;
        return (
            <React.Fragment>
                <div 
                style={top === 1 ? left === 1 ? {
                    opacity, filter: `blur(${blur}px)`, 
                    right, 
                    zIndex: 1,
                    bottom
                } : {
                    opacity, filter: `blur(${blur}px)`, 
                    left, 
                    zIndex: 1,
                    bottom
                } : left === 1 ? {
                    opacity, filter: `blur(${blur}px)`, 
                    right, 
                    zIndex: 1,
                    top
                } : {
                    opacity, filter: `blur(${blur}px)`, 
                    left, 
                    zIndex: 1,
                    top
                }}
                className="blurCircle"></div>
            </React.Fragment>
        )
    }
}

export default Blur;