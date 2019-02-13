import Component from 'react';
import CadreAvatar from "../atoms/CadreAvatar";

export default class Avatar extends Component {
    render() {
        return (
            <CadreAvatar>
                <img src={this.props.pathImage} alt="Avatar" ></img>
            </CadreAvatar>
        )
    }
}