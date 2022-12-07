import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss"
import * as userService from "../../../services/userService"
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        this.getAllUserFromReact()
    }

    getAllUserFromReact = async () => {
        let resp = await userService.getAllUser("All")
        if (resp && resp.errCode === 0) {
            this.setState({
                arrUsers: resp.users,
            }, () => {
                console.log("get users from nodeJS :", resp)
            })
        }
        emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })

    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEdit: true,
            userEdit: user
        })
    }

    toggleModal = () => {
        this.setState((preState) => ({
            isOpenModal: !preState.isOpenModal
        }))
    }

    toggleModalEdit = () => {
        this.setState((preState) => ({
            isOpenModalEdit: !preState.isOpenModalEdit
        }))
    }

    createNewUser = async (data) => {
        console.log("hello: ", data)
        try {
            let resp = await userService.createNewUserService(data)
            console.log("thông báo từ server: ", resp)
            if (resp && resp.errCode !== 0) {
                alert(resp.errMessage)
            } else {
                await this.getAllUserFromReact()
                this.setState({
                    isOpenModal: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            let resp = await userService.deleteUserService(userId)
            console.log("thông báo từ server: ", resp)
            if (resp && resp.errCode !== 0) {
                alert(resp.errMessage)
            } else {
                await this.getAllUserFromReact()
            }
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async (data) => {
        try {
            let resp = await userService.updateUserService(data)
            if (resp && resp.errCode !== 0) {
                alert(resp.errMessage)
            } else {
                await this.getAllUserFromReact()
                this.setState({
                    isOpenModalEdit: false
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { arrUsers, isOpenModal, isOpenModalEdit, userEdit } = this.state
        return (
            <div className='user-container'>
                <ModalUser
                    isOpen={isOpenModal}
                    toggleModal={this.toggleModal}
                    createNewUser={this.createNewUser}
                />
                {
                    isOpenModalEdit &&
                    <ModalEditUser
                        isOpen={isOpenModalEdit}
                        toggleModalEdit={this.toggleModalEdit}
                        userEditData={userEdit}
                        updateUser={this.updateUser}
                    />
                }
                <div className='title text-center'>
                    Manage users with Lê Ngân
                </div>
                <div
                    onClick={this.handleAddNewUser}
                    className='add-user-btn btn-primary'
                >
                    +
                    Add new user
                </div>
                <div className='user-table mt-4 mx-1'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>PhoneNumber</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <button onClick={() => this.handleEditUser(user)} className='btn-edit'>
                                                <i className='bx bxs-pencil'></i>
                                            </button>
                                            <button onClick={() => this.handleDeleteUser(user.id)} className='btn-delete'>
                                                <i className='bx bxs-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
