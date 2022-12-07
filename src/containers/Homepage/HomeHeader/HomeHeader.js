import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss"
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router';


class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageApp(language)
    }

    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        const lang = this.props.lang
        return (
            <div id='HomeHeader'>
                <div className='header_fixed'>
                    <div className='header_container'>
                        <div className='header_menu'>
                            <span className='icon-menu'>
                                <i className='bx bx-menu'></i>
                            </span>
                        </div>
                        <div className='header_logo'>
                            <a href='' onClick={this.returnToHome}>
                                <div className='header_logo-img'></div>
                            </a>
                        </div>
                        <div className='header_navbar'>
                            <div className='header_navbar-item'>
                                <a href=''>
                                    <h5><FormattedMessage id="home-header.speciality" /></h5>
                                    <p><FormattedMessage id="home-header.search-doctor" /></p>
                                </a>
                            </div>
                            <div className='header_navbar-item'>
                                <a href=''>
                                    <h5><FormattedMessage id="home-header.health-facility" /></h5>
                                    <p><FormattedMessage id="home-header.select-room-hospital" /></p>
                                </a>
                            </div>
                            <div className='header_navbar-item'>
                                <a href=''>
                                    <h5><FormattedMessage id="home-header.doctor" /></h5>
                                    <p><FormattedMessage id="home-header.select-doctor" /></p>
                                </a>
                            </div>
                            <div className='header_navbar-item'>
                                <a href=''>
                                    <h5><FormattedMessage id="home-header.examination-package" /></h5>
                                    <p><FormattedMessage id="home-header.general-health-examination" /></p>
                                </a>
                            </div>
                        </div>
                        <div className='header_support'>
                            <a href=''>
                                <span className='icon-question'>
                                    <i className='bx bx-question-mark'></i>
                                </span>
                                <span className='text'><FormattedMessage id="home-header.support" /></span>
                            </a>
                        </div>
                        <div className='header_languages'>
                            <span onClick={() => this.changeLanguage(LANGUAGES.VI)} className={lang === LANGUAGES.VI ? 'vietnam active' : 'vietnam'}>VI</span>
                            <span onClick={() => this.changeLanguage(LANGUAGES.EN)} className={lang === LANGUAGES.EN ? 'english active' : 'english'}>EN</span>
                        </div>
                    </div>
                </div>

                {
                    this.props.isShowBanner &&
                    <div className='banner_container'>
                        <div className='banner_container-bg'>
                            <div className='banner_content'>
                                <div className='banner_title'>
                                    <h3><FormattedMessage id="home-header.medical-background" /></h3>
                                    <h2><FormattedMessage id="home-header.health-care" /></h2>
                                </div>
                                <div className='banner_input-wrap'>
                                    <div className='banner_input-search'>
                                        <span className='icon-search'>
                                            <i className='bx bx-search'></i>
                                        </span>
                                        <input type='search' placeholder='Tìm kiếm' />
                                    </div>
                                    <div style={{ display: 'none' }} className='banner_input-search-result'>
                                        <h4>Chuyên Khoa</h4>
                                        <a href=''><h5>Cơ Xương Khớp</h5></a>
                                        <a href=''><h5>Thần kinh</h5></a>
                                        <a href=''><h5>Tiêu hóa</h5></a>
                                        <a href=''><h5>Tim mạch</h5></a>
                                        <a href=''><h5>Tai Mũi Họng</h5></a>
                                        <a href=''><h5>Cột sống</h5></a>
                                        <a href=''><h5>Y học Cổ truyền</h5></a>
                                        <a href=''><h5>Châm cứu</h5></a>
                                        <a href=''><h5>Sản Phụ khoa</h5></a>
                                        <a href=''><h5>Siêu âm thai</h5></a>
                                        <a href=''><h5>Nhi khoa</h5></a>
                                        <a href=''><h5>Da liễu</h5></a>

                                    </div>
                                </div>

                                <div className='banner_app-download'>
                                    <a href="" className='googlePlay'>
                                    </a>
                                    <a href="" className='appStore'>
                                    </a>
                                </div>
                            </div>

                            <div className='banner_service-bg'>
                                <div className='banner_service'>
                                    <ul className='banner_list'>
                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.specialist-examination" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.remote-examination" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.general-examination" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.medical-test" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.mental-health" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.dental-examination" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.surgery-package" />
                                                </h4>
                                            </a>
                                        </li>

                                        <li className='banner_list-item'>
                                            <a href="">
                                                <div className='icon_service'>
                                                    <img width={'30px'} height={'30px'} src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png' />
                                                </div>
                                                <h4 className='title_service'>
                                                    <FormattedMessage id="home-header.medical-products" />
                                                </h4>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeHeader));