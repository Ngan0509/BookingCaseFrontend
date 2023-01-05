import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userService from '../../../services/userService'
import HomeHeader from '../HomeHeader/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')

            let resp = await userService.postBookingAppointment({ token, doctorId })
            if (resp && resp.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: resp.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: resp && resp.errCode ? resp.errCode : -1
                })
            }
        }

    }

    componentDidUpdate() {

    }



    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader isShowBanner={false} />

                <div className='confirm_container'>
                    {
                        statusVerify === false ?
                            <div className='confirm_notification'>
                                is loading...
                            </div>
                            :
                            <div className='confirm_notification'>
                                {
                                    errCode === 0 ?
                                        <p>Xác nhận lịch hẹn thành công</p>
                                        :
                                        <p>Lịch hẹn của bạn không tìm thấy hoặc đã được xác nhận</p>
                                }
                            </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);