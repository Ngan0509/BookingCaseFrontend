import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import * as userService from '../../../services/userService'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './Modal/RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            patientDataBooking: [],
            isOpenRemedyModal: false,
            dataPatientForRemedy: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getpatientDataBooking()
    }

    getpatientDataBooking = async () => {
        let doctorId = this.props.user.id
        let formatDate = new Date(this.state.currentDate).getTime()
        let resp = await userService.getListPatientForDoctor(doctorId, 1656608400000)
        console.log(resp)
        if (resp && resp.errCode === 0) {
            this.setState({
                patientDataBooking: resp.patientBooking
            })
        }
    }

    componentDidUpdate() {
        this.getpatientDataBooking()

    }

    handleChangeDate = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            this.getpatientDataBooking()
        })

    }

    toggleModal = () => {
        this.setState((preState) => ({
            isOpenRemedyModal: !preState.isOpenRemedyModal,
        }))
    }

    handleConfirmPatient = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            patientName: `${item.patientData.lastName} ${item.patientData.firstName}`,
            timeType: item.timeType
        }
        this.setState({
            isOpenRemedyModal: true,
            dataPatientForRemedy: data,
        })
    }

    sendRemedyForPatient = async (dataFormRemedyModal) => {
        let { dataPatientForRemedy } = this.state
        this.setState({
            isShowLoading: true
        })
        let resp = await userService.sendRemedy({
            ...dataFormRemedyModal,
            doctorId: dataPatientForRemedy.doctorId,
            patientId: dataPatientForRemedy.patientId,
            timeType: dataPatientForRemedy.timeType,
            patientName: dataPatientForRemedy.patientName,
            lang: this.props.lang
        })
        console.log("sendRemedyForPatient", resp)
        if (resp && resp.errCode === 0) {
            toast.success(resp.errMessage)
            this.getpatientDataBooking()
            this.toggleModal()
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error(resp.errMessage)
        }
    }

    render() {
        let { currentDate, patientDataBooking, isOpenRemedyModal, dataPatientForRemedy, isShowLoading } = this.state
        let { lang } = this.props
        let today = new Date();
        let yesterday = new Date(today.setDate(today.getDate() - 1))
        return (
            <LoadingOverlay
                active={isShowLoading}
                spinner
                text='Loading...'
            >
                <>
                    <div className='manage_schedule-container'>
                        <h2 className="text-center title"><FormattedMessage id="menu.doctor.manage-patient" /></h2>
                        <div className='row'>
                            <div className='col col-3 form-date'>
                                <label><FormattedMessage id="menu.doctor.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDate}
                                    className="form-control"
                                    value={currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col form-table'>
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th><FormattedMessage id="manage-user.firstname" /></th>
                                            <th><FormattedMessage id="manage-user.lastname" /></th>
                                            <th><FormattedMessage id="manage-user.address" /></th>
                                            <th><FormattedMessage id="manage-user.sex" /></th>
                                            <th><FormattedMessage id="manage-user.time" /></th>
                                            <th><FormattedMessage id="manage-user.actions" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            patientDataBooking && patientDataBooking.length > 0 ?
                                                patientDataBooking.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.patientData && item.patientData.firstName}</td>
                                                        <td>{item.patientData && item.patientData.lastName}</td>
                                                        <td>{item.patientData && item.patientData.address}</td>
                                                        <td>
                                                            {
                                                                item.patientData && item.patientData.genderData && lang === LANGUAGES.VI ?
                                                                    item.patientData.genderData.valueVi :
                                                                    item.patientData.genderData.valueEn
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.timeTypeBookingData && lang === LANGUAGES.VI ?
                                                                    item.timeTypeBookingData.valueVi :
                                                                    item.timeTypeBookingData.valueEn
                                                            }
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => this.handleConfirmPatient(item)}
                                                                className='confirm-btn btn-primary'>Xác nhận</button>
                                                        </td>
                                                    </tr>

                                                ))
                                                :
                                                <tr>
                                                    <td colSpan={7}>
                                                        No data
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {
                        isOpenRemedyModal &&
                        <RemedyModal
                            isOpen={isOpenRemedyModal}
                            toggleModal={this.toggleModal}
                            dataPatientForRemedy={dataPatientForRemedy}
                            sendRemedyForPatient={this.sendRemedyForPatient}
                        />
                    }
                </>
            </LoadingOverlay>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);