import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Modal } from 'reactstrap';
import { LANGUAGES } from '../../../../utils/constant'
import CommonUtils from '../../../../utils/CommonUtils'


class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            imageBase64: ''
        })
    }

    componentDidMount() {
        if (this.props.dataPatientForRemedy) {
            let dataPatientForRemedy = this.props.dataPatientForRemedy
            this.setState({
                email: dataPatientForRemedy.email
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataPatientForRemedy !== this.props.dataPatientForRemedy) {
            let dataPatientForRemedy = this.props.dataPatientForRemedy
            this.setState({
                email: dataPatientForRemedy.email
            })
        }
    }

    handleChangeText = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangeImage = async (e) => {
        let files = e.target.files;
        let file = files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }


    toggle = () => {
        this.props.toggleModal()
    }

    handleSendRemedyForPatient = () => {
        this.props.sendRemedyForPatient({
            email: this.state.email,
            imageBase64: this.state.imageBase64
        })
    }

    render() {
        let { isOpen, lang } = this.props
        let { email, imageBase64 } = this.state
        return (
            <Modal
                isOpen={isOpen}
                centered
                size="lg"
                toggle={this.toggle}
            >
                <div className='remedyPatient_container'>
                    <header className='remedyPatient_header'>
                        <h3>
                            <FormattedMessage id="menu.doctor.send-bill" />
                        </h3>
                        <span
                            onClick={this.toggle}
                            className='icon-close'
                        >
                            <i className='bx bx-x-circle'></i>
                        </span>
                    </header>
                    <section className='remedyPatient_content'>
                        <div className='remedyForm'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label>Email bệnh nhân</label>
                                        <input
                                            value={email}
                                            onChange={this.handleChangeText}
                                            type='email'
                                            className='form-control'
                                        />
                                    </div>
                                </div>

                                <div className='col'>
                                    <div className='form-group'>
                                        <label>Chọn file đơn thuốc</label>
                                        <div className='previewImg_wrap'>
                                            <input
                                                onChange={this.handleChangeImage}
                                                type="file" id="previewImg" hidden name="image" />
                                            <label className='labelImage btn-primary' htmlFor='previewImg'>
                                                Tải ảnh
                                                <i className='bx bxs-download'></i>
                                            </label>
                                            <div className='previewImg'>
                                                <img src={imageBase64} alt='ảnh preview' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    <footer className='remedyPatient_footer'>
                        <div className='btn-wrap'>
                            <button
                                onClick={this.handleSendRemedyForPatient}
                                className='btn btn-remedy-save'
                            >
                                {
                                    lang === LANGUAGES.VI ? "Gửi" : "Send"
                                }
                            </button>
                            <button
                                onClick={this.toggle}
                                className='btn btn-remedy-cancel'
                            >
                                {
                                    lang === LANGUAGES.VI ? "Hủy" : "Cancel"
                                }
                            </button>

                        </div>
                    </footer>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);