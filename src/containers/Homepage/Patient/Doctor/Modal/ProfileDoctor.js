import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
import * as userService from '../../../../../services/userService'
import { LANGUAGES } from '../../../../../utils';
import moment from 'moment';
import _ from 'lodash'
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom"


class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorProfile: {}
        }
    }

    async componentDidMount() {
        let doctorId = this.props.doctorId
        let data = await this.getProfileDoctor(doctorId)
        this.setState({
            doctorProfile: data
        })
    }

    getProfileDoctor = async (doctorId) => {
        let result = {}
        if (doctorId) {
            let resp = await userService.getProfileDoctorService(this.props.doctorId)
            if (resp && resp.errCode === 0) {
                result = resp.doctor
            }
        }
        return result
    }

    componentDidUpdate() {

    }

    renderBookingSchedule = (dataTime) => {
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
            return (
                <p className='doctor-schedule'>
                    {time} - {date}
                </p>
            )
        }
        return <></>
    }


    render() {
        let { doctorProfile } = this.state
        let { lang, dataScheduleForBooking, isShowBookingProfile, isShowLinkDetail, doctorId } = this.props
        let nameEn, nameVi
        if (doctorProfile && doctorProfile.positionData) {
            nameVi = `${doctorProfile.positionData.valueVi} II ${doctorProfile.lastName} ${doctorProfile.firstName}`
            nameEn = `${doctorProfile.positionData.valueEn} II ${doctorProfile.firstName} ${doctorProfile.lastName}`
        }

        let priceEn, priceVi
        if (doctorProfile && doctorProfile.Doctor_Infor && doctorProfile.Doctor_Infor.priceData) {
            priceVi = doctorProfile.Doctor_Infor.priceData.valueVi
            priceEn = doctorProfile.Doctor_Infor.priceData.valueEn
        }


        return (
            <>
                {
                    isShowBookingProfile ?
                        <>
                            <div className='doctorInfo'>
                                <div className='image'>
                                    <img src={doctorProfile.image} alt='imageDoctor' />
                                </div>
                                <div className='info'>
                                    <h4><FormattedMessage id="section.patient.set-schedule" /></h4>
                                    <p className='doctor-name'>{lang === LANGUAGES.VI ? nameVi : nameEn}</p>

                                    {
                                        this.renderBookingSchedule(dataScheduleForBooking)
                                    }
                                    <p className='scheFree'>
                                        <FormattedMessage id="section.patient.scheFree" />
                                    </p>
                                </div>
                            </div>

                            <div className='choosePrice'>
                                <div className='choosePrice_input'>
                                    <input
                                        defaultChecked
                                        id='radioPrice'
                                        type='radio' />
                                    <label htmlFor='radioPrice'>
                                        <FormattedMessage id="section.patient.price-title" />
                                        {
                                            lang === LANGUAGES.VI ?
                                                <NumberFormat
                                                    className='price'
                                                    value={priceVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                /> :
                                                <NumberFormat
                                                    className='price'
                                                    value={priceEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                        }
                                    </label>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className='doctorProfile_intro'>
                                <div className='doctorProfile_image'>
                                    <img src={doctorProfile.image} alt='doctorImg' />
                                </div>
                                <div className='doctorProfile_body'>
                                    <div className='doctorProfile_title'>
                                        {lang === LANGUAGES.VI ? nameVi : nameEn}
                                    </div>
                                    <div className='doctorProfile_desc'>
                                        {
                                            doctorProfile && doctorProfile.Markdown &&
                                            doctorProfile.Markdown.description
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                isShowLinkDetail &&
                                <div className='link-detail'>
                                    <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                                </div>
                            }
                        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);