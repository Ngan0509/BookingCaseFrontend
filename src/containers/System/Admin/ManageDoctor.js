import React from "react"
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './ManageDoctor.scss'
import { LANGUAGES } from '../../../utils/constant'
import { toast } from 'react-toastify';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

import Select from 'react-select';
import * as userService from '../../../services/userService'

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //save table markdown
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            selectedDoctor: '',
            listDoctors: [],
            hasOldData: false,

            //save table doctor_infor
            selectedPrice: '',
            listPrices: [],
            selectedPayment: '',
            listPayments: [],
            selectedProvince: '',
            listProvinces: [],
            selectedSpecialty: '',
            listSpecialty: [],
            selectedClinic: '',
            listClinic: [],
            addressClinic: '',
            nameClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsStart()
        this.props.fetchPriceDoctorStart()
        this.props.fetchPaymentDoctorStart()
        this.props.fetchProvinceDoctorStart()
        this.props.fetchAllSpecialtyStart()
        this.props.fetchAllClinicStart()
    }

    componentDidUpdate(prevProps) {
        let listDoctors = this.buildInputData(this.props.allDoctorsRedux, "ALLDOCTOR")
        let listPrices = this.buildInputData(this.props.allPricesRedux, "PRICE")
        let listPayments = this.buildInputData(this.props.allPaymentsRedux, "PAYMENT")
        let listProvinces = this.buildInputData(this.props.allProvincesRedux, "PROVINCE")
        let listSpecialty = this.buildInputData(this.props.allSpecialtyRedux, "SPECIALTY")
        let listClinic = this.buildInputData(this.props.allClinicRedux, "CLINIC")
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors
            })
        }

        if (prevProps.allPricesRedux !== this.props.allPricesRedux) {
            this.setState({
                listPrices
            })
        }

        if (prevProps.allPaymentsRedux !== this.props.allPaymentsRedux) {
            this.setState({
                listPayments
            })
        }

        if (prevProps.allProvincesRedux !== this.props.allProvincesRedux) {
            this.setState({
                listProvinces
            })
        }

        if (prevProps.allSpecialtyRedux !== this.props.allSpecialtyRedux) {
            this.setState({
                listSpecialty
            })
        }

        if (prevProps.allClinicRedux !== this.props.allClinicRedux) {
            this.setState({
                listClinic
            })
        }
        if (prevProps.lang !== this.props.lang) {
            this.setState({
                listDoctors,
                listPrices,
                listPayments,
                listProvinces,
                listSpecialty,
                listClinic
            })
        }
    }

    buildInputData = (inputData, type) => {
        let { lang } = this.props
        if (inputData && inputData.length > 0) {
            let result = inputData.map((item) => {
                let value, label
                if (type === "ALLDOCTOR") {
                    label = lang === LANGUAGES.VI ?
                        `${item.lastName} ${item.firstName}` :
                        `${item.firstName} ${item.lastName}`
                    value = item.id
                } else if (type === "PRICE") {
                    label = lang === LANGUAGES.VI ? `${item.valueVi} VND` : `${item.valueEn} USD`
                    value = item.keyMap
                } else if (type === "SPECIALTY" || type === "CLINIC") {
                    label = lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                    value = item.id
                }
                else {
                    label = lang === LANGUAGES.VI ? item.valueVi : item.valueEn
                    value = item.keyMap
                }
                return {
                    label: label,
                    value: value
                }
            })
            return result
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
        console.log('handleEditorChange', html, text);
    }

    handleChangeSelect = async (selectedDoctor) => {
        let resp = await userService.getDetailInfoDoctor(selectedDoctor.value)
        if (resp && resp.errCode === 0 && resp.doctor && resp.doctor.Markdown) {
            if (resp.doctor.Doctor_Infor) {
                let doctor_infor = resp.doctor.Doctor_Infor
                let { listPrices, listPayments, listProvinces, listSpecialty, listClinic } = this.state
                let selectedPrice = listPrices.find(item => item.value === doctor_infor.priceId)
                let selectedPayment = listPayments.find(item => item.value === doctor_infor.paymentId)
                let selectedProvince = listProvinces.find(item => item.value === doctor_infor.provinceId)
                let selectedSpecialty = listSpecialty.find(item => item.value === doctor_infor.specialtyId)
                let selectedClinic = listClinic.find(item => item.value === doctor_infor.clinicId)


                this.setState({
                    addressClinic: doctor_infor.addressClinic,
                    nameClinic: doctor_infor.nameClinic,
                    note: doctor_infor.note,
                    selectedPrice,
                    selectedPayment,
                    selectedProvince,
                    selectedSpecialty,
                    selectedClinic,
                })
            } else {
                this.setState({
                    addressClinic: '',
                    nameClinic: '',
                    note: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    selectedSpecialty: '',
                    selectedClinic: ''
                })
            }
            let markdown = resp.doctor.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
        this.setState({
            selectedDoctor
        }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state }
        copyState[stateName] = selectedOption

        this.setState({
            ...copyState
        })
    }

    handleOnChangeText = (e, name) => {
        let copyState = { ...this.state }
        copyState[name] = e.target.value
        this.setState({
            ...copyState
        })
    }

    checkUserInput = () => {
        let isValid = true
        let arrInputs = ["contentHTML", "description",
            "selectedDoctor", "selectedPrice",
            "selectedPayment", "selectedProvince",
            "addressClinic", "nameClinic", "note", "selectedSpecialty", "selectedClinic"]
        for (let i = 0; i < arrInputs.length; i++) {
            console.log('input changed: ', this.state[arrInputs[i]])
            if (!this.state[arrInputs[i]]) {
                isValid = false
                toast.error(`Missing required parameter: ${arrInputs[i]}`)
                break
            }
        }
        return isValid
    }

    handleSaveInfoDoctor = () => {
        let isValid = this.checkUserInput()
        if (!isValid) return
        let { hasOldData } = this.state
        this.props.saveInfoDoctorUser({
            // Markdown
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            hasOldData,

            // Doctor_InFor
            priceId: this.state.selectedPrice.value,
            paymentId: this.state.selectedPayment.value,
            provinceId: this.state.selectedProvince.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value,
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            addressClinic: '',
            nameClinic: '',
            note: '',
            selectedSpecialty: '',
            selectedClinic: '',
        })
        // console.log(this.state)
    }

    render() {
        const { lang } = this.props
        const { selectedDoctor, description, listDoctors, contentMarkdown, hasOldData } = this.state;
        const { selectedPayment, selectedPrice,
            selectedProvince, listPayments,
            listPrices, listProvinces, addressClinic,
            nameClinic, note, selectedSpecialty, listSpecialty, selectedClinic, listClinic } = this.state;
        return (
            <div className="manage_doctor-container">
                <h2 className="text-center title"><FormattedMessage id="menu.admin.manageDoctor.more-info-doctor" /></h2>
                <div className="manage_doctor-inputs">
                    <div className="row">
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={listDoctors}
                                placeholder={<FormattedMessage id="menu.admin.manageDoctor.select-doctor" />}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.intro-doctor" /></label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => this.handleOnChangeText(e, "description")}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-price" /></label>
                            <Select
                                value={selectedPrice}
                                name="selectedPrice"
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={listPrices}
                                placeholder={<FormattedMessage id="menu.admin.manageDoctor.select-price" />}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-payment" /></label>
                            <Select
                                value={selectedPayment}
                                name="selectedPayment"
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={listPayments}
                                placeholder={<FormattedMessage id="menu.admin.manageDoctor.select-payment" />}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-province" /></label>
                            <Select
                                value={selectedProvince}
                                name="selectedProvince"
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={listProvinces}
                                placeholder={<FormattedMessage id="menu.admin.manageDoctor.select-province" />}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.nameClinic" /></label>
                            <input
                                value={nameClinic}
                                className="form-control"
                                onChange={(e) => this.handleOnChangeText(e, "nameClinic")}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.addressClinic" /></label>
                            <input
                                value={addressClinic}
                                className="form-control"
                                onChange={(e) => this.handleOnChangeText(e, "addressClinic")}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.note" /></label>
                            <input
                                value={note}
                                className="form-control"
                                onChange={(e) => this.handleOnChangeText(e, "note")}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-specialty" /></label>
                            <Select
                                value={selectedSpecialty}
                                name="selectedSpecialty"
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={listSpecialty}
                                placeholder={<FormattedMessage id="menu.admin.manageDoctor.select-specialty" />}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-clinic" /></label>
                            <Select
                                value={selectedClinic}
                                name="selectedClinic"
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={listClinic}
                                placeholder={<FormattedMessage id="menu.admin.manageDoctor.select-clinic" />}
                            />
                        </div>
                    </div>
                </div>
                <div className="manage_doctor-markdown">
                    <MdEditor
                        value={contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={this.handleSaveInfoDoctor}
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
        lang: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allPricesRedux: state.admin.doctorPrices,
        allPaymentsRedux: state.admin.doctorPayments,
        allProvincesRedux: state.admin.doctorProvinces,
        allSpecialtyRedux: state.admin.allSpecialty,
        allClinicRedux: state.admin.allClinic,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchPriceDoctorStart: () => dispatch(actions.fetchPriceDoctorStart()),
        fetchPaymentDoctorStart: () => dispatch(actions.fetchPaymentDoctorStart()),
        fetchProvinceDoctorStart: () => dispatch(actions.fetchProvinceDoctorStart()),
        saveInfoDoctorUser: (data) => dispatch(actions.saveInfoDoctorUser(data)),
        fetchAllSpecialtyStart: () => dispatch(actions.fetchAllSpecialtyStart()),
        fetchAllClinicStart: () => dispatch(actions.fetchAllClinicStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);