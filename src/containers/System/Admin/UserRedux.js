import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import CommonUtils from '../../../utils/CommonUtils';
import UserTable from './UserTable';


class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            // previewImgUrl: '',
            isShow: false,
            isEdit: false,

            idEdit: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: ''
        }
    }

    handleToggleShowForm = () => {
        this.setState((prevstate) => ({
            isShow: !prevstate.isShow
        }))
    }

    componentWillUnmount() {
        this.setState({
            genderArr: [],
            positionArr: [],
            roleArr: [],
            // previewImgUrl: '',
            isShow: false,
            isEdit: false,

            idEdit: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: ''
        })
    }

    componentDidMount() {
        this.props.fetchGenderStart()
        this.props.fetchPositionStart()
        this.props.fetchRoleStart()
    }

    componentDidUpdate(prevprops, prevstate) {
        let arrGender = this.props.genderRedux
        let arrPosition = this.props.positionRedux
        let arrRole = this.props.roleRedux

        if (prevprops.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevprops.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevprops.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if (prevprops.allUsersRedux !== this.props.allUsersRedux) {

            this.setState({
                isShow: false,
                isEdit: false,
                // previewImgUrl: '',

                idEdit: '',
                avatar: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            })
        }
    }

    handleChangeImage = async (e) => {
        let files = e.target.files;
        let file = files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log("fsf", base64)
            this.setState({
                // previewImgUrl: base64,
                avatar: base64
            })
        }
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
                alert(`${arrInputs[i]} is required`)
                break
            }
        }
        return isValid
    }

    handleCreateUser = () => {
        console.log("state:", this.state)
        let isValid = this.checkUserInput()
        if (!isValid) return

        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar
        })
    }

    handleUpdateUser = () => {
        let isValid = this.checkUserInput()
        if (!isValid) return

        this.props.updateUser({
            id: this.state.idEdit,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar
        })
    }

    handleEditUserfromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            isShow: true,
            isEdit: true,

            idEdit: user.id,
            email: user.email,
            password: "HARDCORE",
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            // previewImgUrl: imageBase64,
            avatar: imageBase64
        })
    }

    render() {
        const { genderArr, positionArr, roleArr, isShow, isEdit } = this.state
        const { email, password, firstName,
            lastName, address, phoneNumber,
            gender, role, position, avatar } = this.state
        const { lang } = this.props
        // console.log("state", this.state)
        return (
            <>
                <div className="title">Manage User Redux with Lê Ngân</div>
                <div className='redux_body'>
                    <div
                        onClick={this.handleToggleShowForm}
                        className={isEdit ? 'add-toggle-btn btn-warning' : 'add-toggle-btn btn-primary'}
                    >
                        {
                            isShow ?
                                `${isEdit ? "Hide Edit Form" : "Hide Create Form"}` :
                                `${isEdit ? "Show Edit Form" : "Show Create Form"}`
                        }
                    </div>
                    {
                        isShow &&
                        <div className='redux_form'>
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor='email'>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            disabled={isEdit ? true : false}
                                            value={email}
                                            onChange={(e) => this.handleChangeUserForm(e, "email")}
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor='password'>
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            disabled={isEdit ? true : false}
                                            value={password}
                                            onChange={(e) => this.handleChangeUserForm(e, "password")}
                                            type="password"
                                            className="form-control"
                                            id='password'
                                            name="password" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor='firstName'>
                                            <FormattedMessage id="manage-user.firstname" />
                                        </label>
                                        <input
                                            value={firstName}
                                            onChange={(e) => this.handleChangeUserForm(e, "firstName")}
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor='lastName'>
                                            <FormattedMessage id="manage-user.lastname" />
                                        </label>
                                        <input
                                            value={lastName}
                                            onChange={(e) => this.handleChangeUserForm(e, "lastName")}
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-8">
                                        <label htmlFor='address'>
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            value={address}
                                            onChange={(e) => this.handleChangeUserForm(e, "address")}
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address" />
                                    </div>
                                    <div className="col col-4">
                                        <label htmlFor="phoneNumber">
                                            <FormattedMessage id="manage-user.phoneNumber" />
                                        </label>
                                        <input
                                            value={phoneNumber}
                                            onChange={(e) => this.handleChangeUserForm(e, "phoneNumber")}
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            id="phoneNumber" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-3">
                                        <label htmlFor='image'>
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className='previewImg_wrap'>
                                            <input
                                                onChange={this.handleChangeImage}
                                                type="file" id="previewImg" hidden name="image" />
                                            <label className='labelImage btn-primary' htmlFor='previewImg'>
                                                Tải ảnh
                                                <i className='bx bxs-download'></i>
                                            </label>
                                            <div className='previewImg'>
                                                <img src={avatar} alt='ảnh preview' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col col-9'>
                                        <div className='row'>
                                            <div className="col">
                                                <label htmlFor="gender">
                                                    <FormattedMessage id="manage-user.sex" />
                                                </label>
                                                <select
                                                    value={gender}
                                                    onChange={(e) => this.handleChangeUserForm(e, "gender")}
                                                    name="gender"
                                                    id="gender"
                                                    className="form-control"
                                                >
                                                    {
                                                        genderArr && genderArr.length &&
                                                        genderArr.map((item) => (
                                                            <option value={item.keyMap} key={item.keyMap}>
                                                                {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>

                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="role">
                                                    <FormattedMessage id="manage-user.role" />
                                                </label>
                                                <select
                                                    value={role}
                                                    onChange={(e) => this.handleChangeUserForm(e, "role")}
                                                    name="roleId"
                                                    id="role"
                                                    className="form-control"
                                                >
                                                    {
                                                        roleArr && roleArr.length &&
                                                        roleArr.map((item) => (
                                                            <option value={item.keyMap} key={item.keyMap}>
                                                                {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>

                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="position">
                                                    <FormattedMessage id="manage-user.position" />
                                                </label>
                                                <select
                                                    value={position}
                                                    onChange={(e) => this.handleChangeUserForm(e, "position")}
                                                    name="positionId"
                                                    id="position"
                                                    className="form-control"
                                                >
                                                    {
                                                        positionArr && positionArr.length &&
                                                        positionArr.map((item) => (
                                                            <option value={item.keyMap} key={item.keyMap}>
                                                                {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                            </option>

                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <input
                                                    onClick={isEdit ? this.handleUpdateUser : this.handleCreateUser}
                                                    // onClick={this.handleCreateUser} 
                                                    type="button"
                                                    className={isEdit ? 'form-btn btn-warning' : 'form-btn btn-primary'}
                                                    value={isEdit ?
                                                        lang === LANGUAGES.VI ? "Cập nhật" : "Update" :
                                                        lang === LANGUAGES.VI ? "Tạo" : "Create"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    }
                    <UserTable
                        handleEditUserfromParent={this.handleEditUserfromParent}
                    />
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        allUsersRedux: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        updateUser: (data) => dispatch(actions.updateUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
