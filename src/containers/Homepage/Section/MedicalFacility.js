import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Sections.scss'
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';

import Slider from "react-slick";

class MedicalFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            topClinicArr: [],
        }
    }

    componentDidMount() {
        this.props.fetchTopClinicStart()
    }

    componentDidUpdate(prevprops) {
        if (prevprops.topClinicsRedux !== this.props.topClinicsRedux) {
            this.setState({
                topClinicArr: this.props.topClinicsRedux
            })
        }
    }

    handleGetDetailClinic = (clinicInfo, e) => {
        e.preventDefault()
        console.log("info clinic: ", clinicInfo)
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinicInfo.id}`)
        }
    }

    render() {
        const { lang, settings } = this.props
        const { topClinicArr } = this.state

        return (
            <div id="MedicalFacility" className='section_medicalfacility section'>
                <div className='section_container'>
                    <div className='section_header'>
                        <h3><FormattedMessage id="section.medical-facility" /></h3>
                        <a href='/' className='btn-more'><FormattedMessage id="section.see-more" /></a>
                    </div>
                    <div className='section_content'>
                        <ul className='section_list'>
                            {
                                topClinicArr.length && <Slider {...settings}>
                                    {
                                        topClinicArr && topClinicArr.length > 0 &&
                                        topClinicArr.map(item => {
                                            let imageBase64 = ''
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                            }

                                            let nameVi = `${item.nameVi}`
                                            let nameEn = `${item.nameEn}`

                                            return (
                                                <li
                                                    onClick={(e) => this.handleGetDetailClinic(item, e)}

                                                    key={item.id}
                                                    className='section_list-item'>
                                                    <a href="/" className='section_wrap'>
                                                        <div className='section_image'>
                                                            <img alt='' src={imageBase64} />
                                                        </div>
                                                        <p className='section_title'>
                                                            {
                                                                lang === LANGUAGES.VI ? nameVi : nameEn
                                                            }
                                                        </p>

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
        topClinicsRedux: state.admin.topClinics,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopClinicStart: () => dispatch(actions.fetchTopClinicStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MedicalFacility));
