import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Sections.scss'
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import Slider from "react-slick";
import { withRouter } from 'react-router';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topDoctorsArr: [],
        }
    }

    componentDidMount() {
        this.props.fetchTopDoctorStart()
    }

    componentDidUpdate(prevprops) {
        if (prevprops.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                topDoctorsArr: this.props.topDoctorsRedux
            })
        }
    }

    handleGetDetailDoctor = (doctorInfo, e) => {
        e.preventDefault()
        console.log("info doctor: ", doctorInfo)
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctorInfo.id}`)
        }
    }

    render() {
        let { topDoctorsArr } = this.state
        const { lang, settings } = this.props

        return (
            <div id="OutstandingDoctor" className='section_outstandingdoctor section'>
                <div className='section_container'>
                    <div className='section_header'>
                        <h3><FormattedMessage id="section.outstanding-doctor" /></h3>
                        <a href='/' className='btn-more'><FormattedMessage id="section.see-more" /></a>
                    </div>
                    <div className='section_content'>
                        <ul className='section_list'>
                            {
                                topDoctorsArr.length && <Slider {...settings}>
                                    {
                                        topDoctorsArr && topDoctorsArr.length > 0 &&
                                        topDoctorsArr.map((item) => {
                                            let imageBase64 = ''
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                            }

                                            let nameVi = `${item.positionData.valueVi} II ${item.lastName} ${item.firstName}`
                                            let nameEn = `${item.positionData.valueEn} II ${item.firstName} ${item.lastName}`
                                            return (
                                                <li
                                                    className='section_list-item'
                                                    key={item.id}
                                                    onClick={(e) => this.handleGetDetailDoctor(item, e)}
                                                >
                                                    <a href="/detail-doctor/:id" className='section_wrap outstandingdoctor'>
                                                        <div className='section_image'>
                                                            <img alt='' src={imageBase64} />
                                                        </div>
                                                        <p className='section_title'>{lang === LANGUAGES.VI ? nameVi : nameEn}</p>
                                                        <p className='section_desc'>Sức khỏe tâm thần</p>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </Slider>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        topDoctorsRedux: state.admin.topDoctors,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorStart: () => dispatch(actions.fetchTopDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OutstandingDoctor));
