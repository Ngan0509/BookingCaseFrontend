import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import * as actions from "../../../store/actions";

import { LANGUAGES } from '../../../utils/constant'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
import CommonUtils from '../../../utils/CommonUtils'
import * as userService from '../../../services/userService'
import { toast } from 'react-toastify';
import Select from 'react-select';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptionHTML: '',
            descriptionMarkdown: '',
            nameVi: '',
            nameEn: '',
            selectedSpecialty: '',
            listSpecialty: [],
            imageBase64: '',
            hasOldData: false
        }
    }

    async componentDidMount() {
        this.props.fetchAllSpecialtyStart()
    }

    async componentDidUpdate(prevProps) {
        let listSpecialty = this.buildInputData(this.props.allSpecialtyRedux)
        if (prevProps.allSpecialtyRedux !== this.props.allSpecialtyRedux) {
            this.setState({
                listSpecialty
            })
        }
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                listSpecialty,
            })
        }
    }

    buildInputData = (inputData) => {
        let { lang } = this.props
        if (inputData && inputData.length > 0) {
            let result = inputData.map((item) => {
                let value, label
                label = lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                value = item.id
                return {
                    label: label,
                    value: value
                }
            })
            return result
        }
    }

    handleOnChangeText = (e, name) => {
        let copyState = { ...this.state }
        copyState[name] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleChangeImage = async (e) => {
        let files = e.target.files;
        let file = files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log("fsf", base64)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleChangeSelect = async (selectedSpecialty) => {
        let resp = await userService.getDetailInfoSpecialty(selectedSpecialty.value)
        console.log("getDetailInfoSpecialty", resp)
        if (resp && resp.errCode === 0 && resp.specialty) {
            let specialty = resp.specialty

            this.setState({
                descriptionHTML: specialty.descriptionHTML,
                descriptionMarkdown: specialty.descriptionMarkdown,
                nameVi: specialty.nameVi,
                nameEn: specialty.nameEn,
                imageBase64: specialty.image,
                hasOldData: true
            })
        } else {
            this.setState({
                descriptionHTML: '',
                descriptionMarkdown: '',
                nameVi: '',
                nameEn: '',
                imageBase64: '',
                hasOldData: false
            })
        }
        this.setState({
            selectedSpecialty
        }, () =>
            console.log(`Option selected:`, this.state.selectedSpecialty)
        );
    }


    handleSaveInfoSpecialty = async () => {
        console.log(this.state)

        let { hasOldData } = this.state
        let resp = await userService.saveInfoSpecialtyService({
            specialtyId: this.state.selectedSpecialty.value,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            nameVi: this.state.nameVi,
            nameEn: this.state.nameEn,
            imageBase64: this.state.imageBase64,
            hasOldData
        })

        if (resp && resp.errCode === 0) {
            toast.success(resp.errMessage)
        } else {
            toast.error(resp.errMessage)
        }
        this.setState({
            descriptionHTML: '',
            descriptionMarkdown: '',
            nameVi: '',
            nameEn: '',
            imageBase64: '',
            hasOldData: false,
        })
    }

    render() {
        let { descriptionMarkdown, nameEn, nameVi, hasOldData, imageBase64, listSpecialty, selectedSpecialty } = this.state
        let { lang } = this.props
        console.log(listSpecialty)
        return (
            <div className="manage_specialty-container">
                <h2 className="text-center title">Thêm thông tin chuyên khoa</h2>
                <div className="manage_specialty-inputs">
                    <div className="row">
                        <div className="col form-group">
                            <div className='row'>
                                <div className='col'>
                                    <label>Tên chuyên khoa</label>
                                    <input
                                        value={nameVi}
                                        onChange={(e) => this.handleOnChangeText(e, 'nameVi')}
                                        type='text'
                                        className='form-control'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label>Specialty Name</label>
                                    <input
                                        value={nameEn}
                                        onChange={(e) => this.handleOnChangeText(e, 'nameEn')}
                                        type='text'
                                        className='form-control'
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col form-group">
                            <div className='row'>
                                <div className='col'>
                                    <label htmlFor='image'>
                                        <FormattedMessage id="manage-user.image" />
                                    </label>
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
                            <div className='row'>
                                <div className="col form-group">
                                    <label>Chọn chuyên khoa cần sửa</label>
                                    <Select
                                        value={selectedSpecialty}
                                        onChange={this.handleChangeSelect}
                                        options={listSpecialty}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="manage_specialty-markdown">
                    <MdEditor
                        value={descriptionMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={this.handleSaveInfoSpecialty}
                    className={
                        hasOldData ?
                            "saveInfo_btn btn-warning" :
                            "saveInfo_btn btn-primary"
                    }
                >
                    {
                        hasOldData ?
                            (lang === LANGUAGES.VI ? "Sửa thông tin" : "Update info") :
                            (lang === LANGUAGES.VI ? "Lưu thông tin" : "Save info")
                    }
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        allSpecialtyRedux: state.admin.allSpecialty,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);