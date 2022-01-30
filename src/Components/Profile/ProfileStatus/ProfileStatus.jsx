import React from 'react';
// import StyleSheet from './Description.module.css';
// import Preloader from './../../Common/Preloader/Preloader';

class ProfileStatus extends React.Component {
    

    state = {
        editMode: false,
        status: this.props.status || 'my status'
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status != this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditMode() {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onClick={this.activateEditMode.bind(this)}>{this.props.status || '---'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;