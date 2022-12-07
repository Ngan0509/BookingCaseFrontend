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

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };

        let settingsArrow = {
            nextArrow: <SampleNextArrow slidesToShow={settings.slidesToShow} />,
            prevArrow: <SamplePrevArrow />
        }

        settings = { ...settings, ...settingsArrow }

        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <Handbook />
                <About />
                <HomeFooter />
            </div>
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