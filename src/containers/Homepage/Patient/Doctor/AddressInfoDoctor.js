import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userService from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
import { withRouter } from 'react-router';
import './AddressInfoDoctor.scss'
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';

class AddressInfoDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorAddressInfo: {},
            isShowTablePrice: false
        }
    }

    async componentDidMount() {
        let doctorId = this.props.doctorIdFromParent
        if (doctorId) {
            let resp = await userService.getAddressInfoDoctorService(doctorId)
            if (resp && resp.errCode === 0) {
                this.setState({
                    doctorAddressInfo: resp.doctorInfor
                })
            }
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let doctorId = this.props.doctorIdFromParent
            if (doctorId) {
                let resp = await userService.getAddressInfoDoctorService(doctorId)
                if (resp && resp.errCode === 0) {
                    this.setState({
                        doctorAddressInfo: resp.doctorInfor
                    })
                }
            }
        }
    }

    showTablePrice = () => {
        this.setState({
            isShowTablePrice: true
        })
    }

    hideTablePrice = () => {
        this.setState({
            isShowTablePrice: false
        })
    }

    render() {
        let { doctorAddressInfo, isShowTablePrice } = this.state
        let { lang } = this.props
        let priceEn, priceVi
        if (doctorAddressInfo && doctorAddressInfo.priceData) {
            priceVi = doctorAddressInfo.priceData.valueVi
            priceEn = doctorAddressInfo.priceData.valueEn
        }
        return (
            <div className='addressInfoDoctor_container'>
                <div className='addressClinic_wrap'>
                    <h4><FormattedMessage id="section.patient.clinic-address" /></h4>
                    <div className='nameClicic'>
                        {doctorAddressInfo && doctorAddressInfo.nameClinic ? doctorAddressInfo.nameClinic : ''}
                    </div>
                    <div className='addressClinic'>
                        {doctorAddressInfo && doctorAddressInfo.addressClinic ? doctorAddressInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='price-exam_title'>
                    <span className='price-title'>
                        <FormattedMessage id="section.patient.price-title" />
                    </span>

                    {
                        isShowTablePrice === false &&
                        <>
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
                            <span
                                onClick={this.showTablePrice}
                                className='see-more'
                            >
                                <FormattedMessage id="section.patient.see-more" />

                            </span>
                        </>
                    }
                    {
                        isShowTablePrice &&
                        <>
                            <div className='price-table'>
                                <div className='price-exam_title'>
                                    <span className='price-title'>
                                        <FormattedMessage id="section.patient.price-title" />
                                    </span>

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
                                    <div className='note'>
                                        {doctorAddressInfo && doctorAddressInfo.note ? doctorAddressInfo.note : ''}
                                    </div>
                                </div>
                                <div className='payment-method'>
                                    <FormattedMessage id="section.patient.payment-method" /> {
                                        doctorAddressInfo && doctorAddressInfo.paymentData ?

                                            (
                                                lang === LANGUAGES.VI ?
                                                    doctorAddressInfo.paymentData.valueVi :
                                                    doctorAddressInfo.paymentData.valueEn
                                            )
                                            : ''

                                    }
                                </div>
                            </div>
                            <div
                                onClick={this.hideTablePrice}
                                className='hide-price'
                            >
                                <FormattedMessage id="section.patient.hide-price" />

                            </div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddressInfoDoctor));