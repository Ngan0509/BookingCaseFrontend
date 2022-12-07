import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../../components/Input/DatePicker';
import * as actions from "../../../../../store/actions";
import { LANGUAGES } from '../../../../../utils/constant'
import Select from 'react-select';
import * as userService from "../../../../../services/userService"
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';


class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',
            genderArr: [],

            doctorId: '',
            timeType: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart()
        let { dataScheduleForBooking } = this.props

        let doctorId = dataScheduleForBooking && !_.isEmpty(dataScheduleForBooking) ?
            dataScheduleForBooking.doctorId : ''
        let timeType = dataScheduleForBooking && !_.isEmpty(dataScheduleForBooking) ?
            dataScheduleForBooking.timeType : ''
        this.setState({
            doctorId,
            timeType
        })
    }

    componentDidUpdate(prevProps) {
        let genderArr = this.buildInputData(this.props.genderRedux)
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr
            })
        }
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                genderArr
            })
        }

        if (prevProps.dataScheduleForBooking !== this.props.dataScheduleForBooking) {
            let { dataScheduleForBooking } = this.props
            let doctorId = dataScheduleForBooking && !_.isEmpty(dataScheduleForBooking) ?
                dataScheduleForBooking.doctorId : ''
            let timeType = dataScheduleForBooking && !_.isEmpty(dataScheduleForBooking) ?
                dataScheduleForBooking.timeType : ''
            this.setState({
                doctorId,
                timeType
            })
        }
    }

    buildInputData = (inputData) => {
        let { lang } = this.props
        let result = []
        if (inputData && inputData.length > 0) {
            result = inputData.map((item) => {
                let label = lang === LANGUAGES.VI ? item.valueVi : item.valueEn
                let value = item.keyMap

                return {
                    label: label,
                    value: value
                }
            })
        }
        return result
    }

    toggle = () => {
        this.props.toggleModal()
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    buildBookingScheduleTime = (dataTime) => {
        let { lang } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time
            if (dataTime.timeTypeData) {
                time = lang === LANGUAGES.VI ?
                    dataTime.timeTypeData.valueVi :
                    dataTime.timeTypeData.valueEn
            }
            let date
            if (dataTime.date) {
                date = lang === LANGUAGES.VI ?
                    moment(+dataTime.date).format('dddd - DD/MM') :
                    moment(+dataTime.date).locale('en').format('ddd - DD/MM')
            }
            return `${time} - ${date}`
        }
        return ''
    }

    buildBookingDoctorName = (dataTime) => {
        let { lang } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name
            if (dataTime.doctorData) {
                name = lang === LANGUAGES.VI ?
                    `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                    `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            }
            return name
        }
        return ''
    }

    checkUserInput = () => {
        let isValid = true
        let arrInputs = ["email", "firstName", "lastName", "reason", "gender", "phoneNumber", "address", "birthday"]
        for (let i = 0; i < arrInputs.length; i++) {
            console.log('input changed: ', this.state[arrInputs[i]])
            if (!this.state[arrInputs[i]]) {
                isValid = false
                toast.error(`${arrInputs[i]} is required`)
                break
            }
        }
        return isValid
    }

    handleSaveBooking = async () => {
        let isValid = this.checkUserInput()
        if (!isValid) return
        let date = this.props.dataScheduleForBooking.date
        console.log("date", date)
        console.log("dataScheduleForBooking", this.props.dataScheduleForBooking)

        console.log("ssfss", this.state)
        let birthday = new Date(this.state.birthday).getTime()
        let timeString = this.buildBookingScheduleTime(this.props.dataScheduleForBooking)
        let doctorName = this.buildBookingDoctorName(this.props.dataScheduleForBooking)

        this.setState({
            isShowLoading: true
        })
        let resp = await userService.saveBookingOfPatientService({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            birthday: birthday,
            gender: this.state.gender.value,

            doctorId: this.state.doctorId,
            timeType: this.state.timeType,

            lang: this.props.lang,
            timeString: timeString,
            doctorName: doctorName
        })
        if (resp && resp.errCode === 0) {
            toast.success(resp.errMessage)
            this.props.toggleModal()
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error(resp.errMessage)
        }
    }

    handleChangeDate = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = async (gender) => {
        this.setState({
            gender
        }, () =>
            console.log(`Option selected:`, this.state.gender)
        );
    }

    render() {
        let { isOpen, dataScheduleForBooking, lang } = this.props
        let { firstName, lastName, phoneNumber, email, address, reason, birthday, gender, genderArr, isShowLoading } = this.state
        let doctorId = dataScheduleForBooking && !_.isEmpty(dataScheduleForBooking) ?
            dataScheduleForBooking.doctorId : ''
        return (
            <LoadingOverlay
                active={isShowLoading}
                spinner
                text='Loading...'
            >
                <Modal
                    isOpen={isOpen}
                    centered
                    size="lg"
                    toggle={this.toggle}
                >
                    <div className='bookingSchedule_container'>
                        <header className='bookingSchedule_header'>
                            <h3>
                                <FormattedMessage id="section.patient.book-appointment" />
                            </h3>
                            <span
                                onClick={this.toggle}
                                className='icon-close'
                            >
                                <i className='bx bx-x-circle'></i>
                            </span>
                        </header>
                        <section className='bookingSchedule_content'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                dataScheduleForBooking={dataScheduleForBooking}
                                isShowBookingProfile={true}
                            />

                            <div className='bookingForm'>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i className='bx bxs-user'></i></span>
                                            <FormattedMessage id="manage-user.firstname">
                                                {
                                                    placeholder =>
                                                        <input
                                                            value={firstName}
                                                            onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                                                            placeholder={placeholder}
                                                            type="text"
                                                            className='form-control'
                                                        />

                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i className='bx bxs-user'></i></span>
                                            <FormattedMessage id="manage-user.lastname">
                                                {
                                                    placeholder =>
                                                        <input
                                                            value={lastName}
                                                            onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                                                            placeholder={placeholder}
                                                            type="text"
                                                            className='form-control'
                                                        />

                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i className='bx bxs-envelope'></i></span>
                                            <FormattedMessage id="manage-user.email">
                                                {placeholder =>
                                                    <input
                                                        value={email}
                                                        onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                                        placeholder={placeholder}
                                                        type="text"
                                                        className='form-control'
                                                    />
                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i className='bx bx-current-location'></i></span>
                                            <FormattedMessage id="manage-user.address">
                                                {
                                                    placeholder =>
                                                        <input
                                                            value={address}
                                                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                                            placeholder={placeholder}
                                                            type="text"
                                                            className='form-control'
                                                        />

                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i class='bx bxs-plus-circle'></i></span>
                                            <FormattedMessage id="manage-user.reason">
                                                {
                                                    placeholder =>
                                                        <textarea
                                                            value={reason}
                                                            onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                                            placeholder={placeholder}
                                                            type="text"
                                                            className='form-control'
                                                        >
                                                        </textarea>

                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i class='bx bxs-comment-dots'></i></span>
                                            <FormattedMessage id="manage-user.birthday">
                                                {
                                                    placeholder =>
                                                        <DatePicker
                                                            onChange={this.handleChangeDate}
                                                            className="form-control"
                                                            value={birthday}
                                                            placeholder={placeholder}
                                                        />

                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i className='bx bxs-phone-call'></i></span>
                                            <FormattedMessage id="manage-user.phoneNumber">
                                                {
                                                    placeholder =>
                                                        <input
                                                            value={phoneNumber}
                                                            onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                                            placeholder={placeholder}
                                                            type="text"
                                                            className='form-control'
                                                        />

                                                }
                                            </FormattedMessage>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <span><i class='bx bx-male-female'></i></span>
                                            <Select
                                                value={gender}
                                                onChange={this.handleChangeSelect}
                                                options={genderArr}
                                                placeholder={<FormattedMessage id="manage-user.sex" />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer className='bookingSchedule_footer'>
                            <div className='btn-wrap'>
                                <button
                                    onClick={this.handleSaveBooking}
                                    className='btn btn-booking-save'
                                >
                                    {
                                        lang === LANGUAGES.VI ? "Xác nhận" : "Confirm"
                                    }
                                </button>
                                <button
                                    onClick={this.toggle}
                                    className='btn btn-booking-cancel'
                                >
                                    {
                                        lang === LANGUAGES.VI ? "Hủy" : "Cancel"
                                    }
                                </button>

                            </div>
                        </footer>
                    </div>
                </Modal>
            </LoadingOverlay>

        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);