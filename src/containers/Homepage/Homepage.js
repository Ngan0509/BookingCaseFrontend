import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader/HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter/HomeFooter';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from '../Homepage/Section/ArrowButtons/ArrowButtons'
import LoadingOverlay from 'react-loading-overlay';

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slidesToShow: 4,
            isShowLoading: true
        }
    }

    handleResize = () => {
        if (window.innerWidth > 600 && window.innerWidth <= 1024) {
            this.setState({
                slidesToShow: 3
            });
        } else if (window.innerWidth > 480 && window.innerWidth <= 600) {
            this.setState({
                slidesToShow: 2
            });
        } else if (window.innerWidth <= 480) {
            this.setState({
                slidesToShow: 1
            });
        } else if (window.innerWidth > 1024) {
            this.setState({
                slidesToShow: 4
            })
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
        this.time = setTimeout(() => {
            this.setState({
                isShowLoading: false
            })
        }, 1500)
    }

    componentWillUnmount() {
        clearTimeout(this.time)
        window.removeEventListener('resize', this.handleResize)
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
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
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loading...'
            >
                <div>
                    <HomeHeader isShowBanner={true} />
                    <Specialty settings={settings} />
                    <MedicalFacility settings={settings} />
                    <OutstandingDoctor settings={settings} />
                    <Handbook />
                    <About />
                    <HomeFooter />
                </div>
            </LoadingOverlay>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);