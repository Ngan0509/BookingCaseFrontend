import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomeHeader/HomeHeader'
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import ProfileDoctor from '../Doctor/Modal/ProfileDoctor';
import * as userService from '../../../../services/userService'
import * as actions from "../../../../store/actions";
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils/constant'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // arrDoctorId: [65, 59],
            isReadMore: false,
            detailSpecialtyInfo: {},
            listProvinces: [],
            arrDoctorId: []
        }
    }

    async componentDidMount() {
        this.props.fetchProvinceDoctorStart()

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let inputId = {
                id: this.props.match.params.id,
                location: "ALL"
            }
            let resp = await userService.getDetailInfoSpecialty(inputId.id, inputId.location)
            if (resp && resp.errCode === 0) {
                let arrDoctorId = []
                if (resp.specialty && !_.isEmpty(resp.specialty)) {
                    arrDoctorId = resp.specialty.doctorSpecialty.map(item => item.doctorId)
                }
                this.setState({
                    detailSpecialtyInfo: resp.specialty,
                    arrDoctorId: arrDoctorId
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allProvincesRedux !== this.props.allProvincesRedux) {
            let listProvinces = this.props.allProvincesRedux
            let dataProvinces = [{
                createdAt: null,
                type: "PROVINCE",
                keyMap: "ALL",
                valueEn: "All city",
                valueVi: "Toàn quốc"
            }, ...listProvinces]
            this.setState({
                listProvinces: dataProvinces
            })
        }
    }

    handleChangeReadMore = () => {
        this.setState((preState) => ({
            isReadMore: !preState.isReadMore
        }))
    }

    handleOnChangeSelect = async (e) => {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let inputId = {
                id: this.props.match.params.id,
                location: e.target.value
            }
            let resp = await userService.getDetailInfoSpecialty(inputId.id, inputId.location)
            if (resp && resp.errCode === 0) {
                let data = resp.specialty
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    arrDoctorId = data.doctorSpecialty.map(item => item.doctorId)
                }
                this.setState({
                    detailSpecialtyInfo: data,
                    arrDoctorId: arrDoctorId
                })
            }
        }
    }

    render() {
        let { isReadMore, detailSpecialtyInfo, listProvinces, arrDoctorId } = this.state
        let { lang } = this.props
        let imageBg = ''
        if (detailSpecialtyInfo && !_.isEmpty(detailSpecialtyInfo)) {
            imageBg = detailSpecialtyInfo.image
        }
        console.log("arrDoctorId: ", arrDoctorId)
        return (
            <>
                <HomeHeader />
                <div className='detailSpecialty_container'>
                    <div
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgb(255, 255, 255)), url("${imageBg}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className={isReadMore ? 'detailSpecialty_infor-bg active' : 'detailSpecialty_infor-bg'}>
                        <div className='detailSpecialty_infor'>
                            {
                                detailSpecialtyInfo && !_.isEmpty(detailSpecialtyInfo) &&
                                <div dangerouslySetInnerHTML={{ __html: detailSpecialtyInfo.descriptionHTML }} />
                            }
                        </div>
                    </div>
                    <div className='read-more'>
                        <p
                            onClick={this.handleChangeReadMore}
                            className='read-more-btn'
                        >
                            {
                                isReadMore ? "Ẩn bớt" : "Đọc Thêm"
                            }

                        </p>
                    </div>
                    <div className='detailSpecialty_doctorInfor-list-bg'>
                        <div className='select-location'>
                            <select
                                onChange={this.handleOnChangeSelect}
                                name="location"
                                id="location"
                                className="form-control"
                            >
                                {
                                    listProvinces && listProvinces.length &&
                                    listProvinces.map((item) => (
                                        <option value={item.keyMap} key={item.keyMap}>
                                            {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>

                                    ))
                                }
                            </select>
                        </div>
                        <div className='detailSpecialty_doctorInfor-list'>
                            {
                                arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map(item => (
                                    <div
                                        key={item}
                                        className='detailSpecialty_doctorInfor-item'
                                    >
                                        <div className='row'>
                                            <div className='col'>
                                                <div className='ProfileDoctor'>
                                                    <ProfileDoctor
                                                        doctorId={item}
                                                        isShowBookingProfile={false}
                                                        isShowLinkDetail={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='ScheduleDoctor'>
                                                    <ScheduleDoctor
                                                        doctorIdFromParent={item}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        allProvincesRedux: state.admin.doctorProvinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvinceDoctorStart: () => dispatch(actions.fetchProvinceDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);