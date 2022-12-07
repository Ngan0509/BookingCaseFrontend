import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Sections.scss'
import { connect } from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from './ArrowButtons/ArrowButtons'
import handbookImage from '../../../assets/HompageImages/Handbook/niengrang.jpg'
class Handbook extends Component {

    state = {

    }

    componentDidMount() {
    }


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
        };

        let settingsArrow = {
            nextArrow: <SampleNextArrow slidesToShow={settings.slidesToShow}/>,
            prevArrow: <SamplePrevArrow />
        }

        settings = { ...settings, ...settingsArrow}
        return (
            <div id="Handbook" className='section_handbook section'>
                <div className='section_container'>
                    <div className='section_header'>
                        <h3><FormattedMessage id="section.hand-book" /></h3>
                        <a href='' className='btn-more'><FormattedMessage id="section.all-posts" /></a>
                    </div>
                    <div className='section_content'>
                        <ul className='section_list'>
                            <Slider {...settings}>
                                <li className='section_list-item'>
                                    <a href="" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>
                                    </a>
                                </li>
                                <li className='section_list-item'>
                                    <a href="" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>

                                    </a>
                                </li>
                                <li className='section_list-item'>
                                    <a href="" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>

                                    </a>
                                </li>
                                <li className='section_list-item'>
                                    <a href="" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>

                                    </a>
                                </li>

                            </Slider>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
