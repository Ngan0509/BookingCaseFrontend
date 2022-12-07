import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeFooter.scss"
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
import bocongthuong from '../../../assets/HompageImages/bocongthuong.svg'
import facebook from '../../../assets/HompageImages/facebooksquare.svg'
import youtube from '../../../assets/HompageImages/youtubesquare.svg'



class HomeFooter extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div id='HomeFooter'>
                <div className='footer_container'>
                    <div className='footer_content'>
                        <div className='footer-row'>
                            <div className='footer-col'>
                                <div className='footer_info'>
                                    <div className='logo'>
                                        <a href='' className='logo_image'></a>
                                    </div>
                                    <div className='address'>
                                        <h5><FormattedMessage id="home-footer.ft-company-name" /></h5>
                                        <p>
                                            <i className='bx bxs-location-plus' ></i>
                                            28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                                        </p>
                                        <p>
                                            <i className='bx bx-check' ></i>
                                            ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                                        </p>
                                    </div>
                                    <div className='label'>
                                        <a href='' className='label_image'>
                                            <img src={bocongthuong} alt='' />
                                        </a>
                                        <a href='' className='label_image'>
                                            <img src={bocongthuong} alt='' />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className='footer-col'>
                                <div className='footer-row'>
                                    <div className='footer-col'>
                                        <div className='footer_list'>
                                            <a href=''><FormattedMessage id="home-footer.ft-list1" /></a>
                                            <a href=''><FormattedMessage id="home-footer.ft-list2" /></a>
                                            <a href=''><FormattedMessage id="home-footer.ft-list3" /></a>
                                            <a href=''><FormattedMessage id="home-footer.ft-list4" /></a>
                                            <a href=''><FormattedMessage id="home-footer.ft-list5" /></a>
                                            <a href=''><FormattedMessage id="home-footer.ft-list6" /></a>
                                        </div>
                                    </div>
                                    <div className='footer-col'>
                                        <div className='footer_address'>
                                            <div className='wrap'>
                                                <strong>Trụ sở tại Hà Nội</strong>
                                                <br />
                                                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                                            </div>
                                            <div className='wrap'>
                                                <strong>Văn phòng tại TP Hồ Chí Minh</strong>
                                                <br />
                                                6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1
                                            </div>
                                            <div className='wrap'>
                                                <strong>Hỗ trợ khách hàng</strong>
                                                <br />
                                                support@bookingcare.vn (7h30 -18h)
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='footer_app-download'>
                        <span className='icon'><i className='bx bx-microchip'></i></span>
                        <span className='text'><FormattedMessage id="home-footer.ft-app-download" /></span>
                        <span className='link'>
                            <a href=''>Android - </a>
                            <a href=''>iPhone/iPad - </a>
                            <a href=''>Khác</a>
                        </span>
                    </div>
                </div>

                <div className='copyright_container-bg'>
                    <div className='copyright_container'>
                        <div className='copyright'>
                            <p>© 2022 BookingCare.</p>
                        </div>
                        <div className='socials'>
                            <a href=''>
                                <img src={facebook} alt='' />
                            </a>
                            <a href=''>
                                <img src={youtube} alt='' />

                            </a>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);