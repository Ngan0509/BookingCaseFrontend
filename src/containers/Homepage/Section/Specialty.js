import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Sections.scss'
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant'
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';


import Slider from "react-slick";

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topSpecialtyArr: [],
        }
    }

    componentDidMount() {
        this.props.fetchTopSpecialtyStart()
    }

    componentDidUpdate(prevprops) {
        if (prevprops.topSpecialtysRedux !== this.props.topSpecialtysRedux) {
            this.setState({
                topSpecialtyArr: this.props.topSpecialtysRedux
            })
        }
    }

    handleGetDetailSpecialty = (specialtyInfo, e) => {
        e.preventDefault()
        console.log("info specialty: ", specialtyInfo)
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialtyInfo.id}`)
        }
    }

    render() {

        const { lang, settings } = this.props
        const { topSpecialtyArr } = this.state

        return (
            <div id="Specialty" className='section_specialty section'>
                <div className='section_container'>
                    <div className='section_header'>
                        <h3><FormattedMessage id="section.popular-specialties" /></h3>
                        <a href='/' className='btn-more'><FormattedMessage id="section.see-more" /></a>
                    </div>
                    <div className='section_content'>
                        <ul className='section_list'>
                            {
                                topSpecialtyArr.length && <Slider {...settings}>
                                    {
                                        topSpecialtyArr && topSpecialtyArr.length > 0 &&
                                        topSpecialtyArr.map(item => {
                                            let imageBase64 = ''
                                            if (item.image) {
                                                imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                            }

                                            let nameVi = `${item.nameVi}`
                                            let nameEn = `${item.nameEn}`

                                            return (
                                                <li
                                                    key={item.id}
                                                    onClick={(e) => this.handleGetDetailSpecialty(item, e)}
                                                    className='section_list-item'
                                                >
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
        topSpecialtysRedux: state.admin.topSpecialtys,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopSpecialtyStart: () => dispatch(actions.fetchTopSpecialtyStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Specialty));
