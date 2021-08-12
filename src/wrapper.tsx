import React, {ReactNode} from 'react';
import { Dispatch } from 'redux';
import { MyState } from "./reducers";
import { addMapRedux } from "./actions/map";
import { useSelector, useDispatch, connect } from "react-redux";


type Props = {
    children: ReactNode;
    addMapRedux: Function;
}
type State = {}
class Wrapper extends React.Component<Props, State> {
    componentDidMount() {
        // this.props.addMapRedux('map')
    }
    render() {
        const {children} = this.props;
        return (
            <React.Fragment>
                <div>
                    {children}
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = ({map}: MyState) => ({
    map
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    addMapRedux: (map: object) => dispatch(addMapRedux(map))
})
  
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Wrapper)
