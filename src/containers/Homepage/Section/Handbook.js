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
    constructor(props) {
        super(props)
        this.state = {
            slidesToShow: 4
        }
    }

    handleResize = () => {
        console.log("abc")
        if (window.innerWidth > 600 && window.innerWidth <= 1024) {
            this.setState({
                slidesToShow: 2
            });
        } else if (window.innerWidth > 480 && window.innerWidth <= 600) {
            this.setState({
                slidesToShow: 1
            });
        } else if (window.innerWidth <= 480) {
            this.setState({
                slidesToShow: 1
            });
        } else if (window.innerWidth > 1024) {
            this.setState({
                slidesToShow: 2
            })
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false,
                        infinite: false,
                        speed: 500,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        infinite: false,
                        speed: 500,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        infinite: false,
                        speed: 500,
                    }
                }
            ]
        };

        let settingsArrow = {
            nextArrow: <SampleNextArrow slidesToShow={this.state.slidesToShow} />,
            prevArrow: <SamplePrevArrow />
        }

        settings = { ...settings, ...settingsArrow }
        return (
            <div id="Handbook" className='section_handbook section'>
                <div className='section_container'>
                    <div className='section_header'>
                        <h3><FormattedMessage id="section.hand-book" /></h3>
                        <a href='/' className='btn-more'><FormattedMessage id="section.all-posts" /></a>
                    </div>
                    <div className='section_content'>
                        <ul className='section_list'>
                            <Slider {...settings}>
                                <li className='section_list-item'>
                                    <a href="/" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>
                                    </a>
                                </li>
                                <li className='section_list-item'>
                                    <a href="/" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>

                                    </a>
                                </li>
                                <li className='section_list-item'>
                                    <a href="/" className='section_wrap two'>
                                        <div className='section_image'>
                                            <img alt='' src={handbookImage} />
                                        </div>
                                        <p className='section_title'>7 địa chỉ Niềng răng trong suốt (Invisalign) tốt và uy tín TP.HCM</p>

                                    </a>
                                </li>
                                <li className='section_list-item'>
                                    <a href="/" className='section_wrap two'>
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
