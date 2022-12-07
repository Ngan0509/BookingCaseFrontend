import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomeHeader/HomeHeader';
import * as userService from '../../../../services/userService'
import { LANGUAGES } from '../../../../utils';
import './DetailDoctor.scss'
import ScheduleDoctor from './ScheduleDoctor';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctorInfo: {},
            currentDoctorId: ''
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let resp = await userService.getDetailInfoDoctor(this.props.match.params.id)
            if (resp && resp.errCode === 0) {
                this.setState({
                    detailDoctorInfo: resp.doctor,
                    currentDoctorId: resp.doctor.id
                })
            }
        }
    }

    componentDidUpdate() {

    }

    render() {
        let { detailDoctorInfo, currentDoctorId } = this.state
        let { lang } = this.props
        console.log("detailDoctorInfo: ", detailDoctorInfo)
        console.log("currentDoctorId: ", currentDoctorId)
        let titleEn, titleVi
        if (detailDoctorInfo && detailDoctorInfo.positionData) {
            titleVi = `${detailDoctorInfo.positionData.valueVi} II ${detailDoctorInfo.lastName} ${detailDoctorInfo.firstName}`
            titleEn = `${detailDoctorInfo.positionData.valueEn} II ${detailDoctorInfo.firstName} ${detailDoctorInfo.lastName}`
        }
        return (
            <div>
                <HomeHeader isShowBanner={false} />
                <div className='detailDoctor_container'>
                    <div className='detailDoctor_intro'>
                        <div className='detailDoctor_image'>
                            <img src={detailDoctorInfo.image} alt='doctorImg' />
                        </div>
                        <div className='detailDoctor_body'>
                            <div className='detailDoctor_title'>
                                {lang === LANGUAGES.VI ? titleVi : titleEn}
                            </div>
                            <div className='detailDoctor_desc'>
                                {
                                    detailDoctorInfo && detailDoctorInfo.Markdown &&
                                    detailDoctorInfo.Markdown.description
                                }
                            </div>
                        </div>
                    </div>
                    <div className='detailDoctor_schedule'>
                        <ScheduleDoctor
                            doctorIdFromParent={currentDoctorId}
                        />
                    </div>

                    <div className='detailDoctor_bg'>
                        <div className='detailDoctor_info'>
                            {
                                detailDoctorInfo && detailDoctorInfo.Markdown &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctorInfo.Markdown.contentHTML }} />
                            }
                        </div>
                    </div>
                    <div className='detailDoctor_comment'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);