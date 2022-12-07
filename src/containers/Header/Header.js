import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, USER_ROLE } from '../../utils/constant'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }

    componentDidMount () {
        let { userInfo } = this.props
        let menu = []
        if(userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if(role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if(role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
            // if(role === USER_ROLE.PATIENT) {
                
            // }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, lang, userInfo } = this.props;
        // console.log(userInfo)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className='right-wrap'>
                    <div className='welcome'>
                        <span><FormattedMessage id="home-header.welcome" />, {userInfo && userInfo.firstName ? userInfo.firstName : ""} !!!</span>
                    </div>
                    <div className='languages'>
                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)} className={lang === LANGUAGES.VI ? 'vietnam active' : 'vietnam'}>VI</span>
                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)} className={lang === LANGUAGES.EN ? 'english active' : 'english'}>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
