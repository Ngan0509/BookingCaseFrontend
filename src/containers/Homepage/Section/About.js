import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './Sections.scss'
import { connect } from 'react-redux';
import duck from '../../../assets/HompageImages/vit.jpg'

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div id="About" className='section_about section'>
                <div className='section_container'>
                    <div className='section_header'>
                        <h3><FormattedMessage id="section.media-talk" /></h3>
                    </div>
                    <div className='section_content about'>
                        <div className='about_video'>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className='about_channel'>
                            <img src={duck} alt='vịt triết gia' />
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);