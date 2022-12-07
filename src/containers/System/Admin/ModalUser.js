import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: 1,
            roleId: 1,
        }
        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: 1,
                roleId: 1,
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleModal()
    }

    handleChangeUserForm = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    checkUserInput = () => {
        let isValid = true
        let arrInputs = ["email", "password", "firstName", "lastName", "phoneNumber", "address"]
        for (let i = 0; i < arrInputs.length; i++) {
            console.log('input changed: ', this.state[arrInputs[i]])
            if (!this.state[arrInputs[i]]) {
                isValid = false
                console.log("Missing Parameters...")
                break
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkUserInput()
        if (isValid) {
            this.props.createNewUser(this.state)
        }
        // this.setState({
        //     email: '',
        //     password: '',
        //     firstName: '',
        //     lastName: '',
        //     address: '',
        //     phoneNumber: '',
        //     gender: 1,
        //     roleId: 1,
        // })
    }

    render() {
        const { isOpen } = this.props
        const { email, password, firstName, lastName, address, phoneNumber, gender, roleId } = this.state
        return (
            <Modal
                isOpen={isOpen}
                toggle={this.toggle}
                size="lg"
                className='modal_user-container'
            >
                <ModalHeader toggle={this.toggle}>
                    Form Create User
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="container-row">
                            <form action="/post-crud" method="POST">
                                <div className="form-row">
                                    <div className="form-group md-6_user">
                                        <label htmlFor="email">Email</label>
                                        <input value={email} onChange={(e) => this.handleChangeUserForm(e, "email")} type="email" className="form-control" name="email" id="email" placeholder="Email" />
                                    </div>
                                    <div className="form-group md-6_user">
                                        <label htmlFor="password">Password</label>
                                        <input value={password} onChange={(e) => this.handleChangeUserForm(e, "password")} type="password" className="form-control" name="password" id="password"
                                            placeholder="Password" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group md-6_user">
                                        <label htmlFor="firstName">First Name</label>
                                        <input value={firstName} onChange={(e) => this.handleChangeUserForm(e, "firstName")} type="text" className="form-control" id="firstName" name="firstName" />
                                    </div>
                                    <div className="form-group md-6_user">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input value={lastName} onChange={(e) => this.handleChangeUserForm(e, "lastName")} type="text" className="form-control" id="lastName" name="lastName" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input value={address} onChange={(e) => this.handleChangeUserForm(e, "address")} type="text" className="form-control" name="address" id="address" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group md-3_user">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input value={phoneNumber} onChange={(e) => this.handleChangeUserForm(e, "phoneNumber")} type="text" className="form-control" name="phoneNumber" id="phoneNumber" />
                                    </div>
                                    <div className="form-group md-3_user">
                                        <label htmlFor="gender">Sex</label>
                                        <select value={gender} onChange={(e) => this.handleChangeUserForm(e, "gender")} name="gender" id="gender" className="form-control">
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group md-3_user">
                                        <label htmlFor="role">Role</label>
                                        <select value={roleId} onChange={(e) => this.handleChangeUserForm(e, "roleId")} name="roleId" id="role" className="form-control">
                                            <option value="1">Admin</option>
                                            <option value="2">Doctor</option>
                                            <option value="3">Patient</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='btn-user'
                        color="primary"
                        onClick={this.handleAddNewUser}
                    >
                        Add user
                    </Button>
                    {' '}
                    <Button
                        className='btn-user'
                        onClick={this.toggle}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

