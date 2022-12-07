import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userService from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
import './ScheduleDoctor.scss'
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi'
import { withRouter } from 'react-router';
import AddressInfoDoctor from './AddressInfoDoctor';
import BookingModal from './Modal/BookingModal';

class ScheduleDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allTimes: [],
            isOpenBookingModal: false,
            dataScheduleForBooking: {},
        }
    }

    async componentDidMount() {
        let allDays = this.getAllDaysForSelect()
        let doctorId = this.props.doctorIdFromParent
        if (doctorId) {
            let date = allDays[0].value
            let resp = await userService.getScheduleByDateService(doctorId, date)

            if (resp && resp.errCode === 0) {
                this.setState({
                    allTimes: resp.data
                })
            }
        }
        this.setState({
            allDays: allDays
        })
    }

    getAllDaysForSelect = () => {
        let { lang } = this.props
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM')
                if (lang === LANGUAGES.VI) {
                    obj.label = `Hôm nay - ${ddMM}`
                } else {
                    obj.label = `Today - ${ddMM}`
                }
            } else {
                if (lang === LANGUAGES.VI) {
                    obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(obj)
        }

        return allDays
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.lang !== this.props.lang) {
            let allDays = this.getAllDaysForSelect()

            this.setState({
                allDays: allDays
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let allDays = this.getAllDaysForSelect()
            let doctorId = this.props.doctorIdFromParent
            if (doctorId) {
                let date = allDays[0].value
                let resp = await userService.getScheduleByDateService(doctorId, date)

                if (resp && resp.errCode === 0) {
                    this.setState({
                        allTimes: resp.data
                    })
                }
            }
        }
    }

    handleChangeSelectDays = async (e) => {
        let doctorId = this.props.doctorIdFromParent
        if (doctorId) {
            let date = e.target.value
            console.log("doctorId: ", doctorId)
            console.log("date: ", date)
            let resp = await userService.getScheduleByDateService(doctorId, date)

            if (resp && resp.errCode === 0) {
                this.setState({
                    allTimes: resp.data
                })
            }
        }
    }

    toggleModal = () => {
        this.setState((preState) => ({
            isOpenBookingModal: !preState.isOpenBookingModal,
        }))
    }

    handleBookingScheduleModal = (time) => {
        this.setState({
            isOpenBookingModal: true,
            dataScheduleForBooking: time,
        })
    }

    render() {
        let { allDays, allTimes, isOpenBookingModal, dataScheduleForBooking } = this.state
        let { lang, doctorIdFromParent } = this.props
        return (
            <>
                <div className='detailDoctor_schedule-container'>
                    <div className='select-days'>
                        <select
                            onChange={this.handleChangeSelectDays}
                        >
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((item, index) => (
                                    <option
                                        value={item.value}
                                        key={item.value}
                                    >
                                        {item.label}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <h3 className='detailDoctor_schedule-title'>
                        <span><i class='bx bxs-calendar'></i></span>
                        <FormattedMessage id="section.patient.schedule" />
                    </h3>
                    <div className='select-times'>
                        <div className='scheduleTimes'>
                            <div className='scheduleTimes_btn'>
                                {

                                    allTimes && allTimes.length > 0 ?
                                        allTimes.map(item => (
                                            <button
                                                onClick={() => this.handleBookingScheduleModal(item)}
                                                className='btn-times'
                                                key={item.timeType}
                                            >
                                                {
                                                    item.timeTypeData &&
                                                        lang === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                }
                                            </button>
                                        )) :

                                        <p><FormattedMessage id="section.patient.no-schedule" /></p>
                                }
                            </div>
                            {
                                allTimes && allTimes.length > 0 &&
                                <div className='note'>
                                    <FormattedMessage id="section.patient.select" />
                                    <span><i class='bx bxs-hand-up'></i></span>
                                    <FormattedMessage id="section.patient.book-fee" />
                                </div>
                            }
                        </div>
                        <div className='addressInfoDoctor'>
                            <AddressInfoDoctor
                                doctorIdFromParent={doctorIdFromParent}
                            />
                        </div>
                    </div>

                </div>
                {
                    isOpenBookingModal &&
                    <BookingModal
                        isOpen={isOpenBookingModal}
                        toggleModal={this.toggleModal}
                        dataScheduleForBooking={dataScheduleForBooking}
                    />
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScheduleDoctor));