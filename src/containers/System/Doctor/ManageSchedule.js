import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant'
import * as actions from "../../../store/actions";
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import * as userService from '../../../services/userService'
import moment from 'moment';


class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            listDoctors: [],
            hasOldData: false,
            currentDate: '',
            scheduleTimesArr: []
        }
    }

    componentWillUnmount() {
        this.setState({
            selectedDoctor: '',
            listDoctors: [],
            hasOldData: false,
            currentDate: '',
            scheduleTimesArr: []
        })
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsStart()
        this.props.fetchScheduleTimeStart()
        await userService.deleteDateOldService();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            let dataSelect = this.buildInputData(this.props.allDoctorsRedux)
            this.setState({
                listDoctors: dataSelect,
            })
        }

        if (prevProps.scheduleTimesRedux !== this.props.scheduleTimesRedux) {
            let data = this.props.scheduleTimesRedux
            if (data && data.length > 0) {
                data = data.map((item) => ({
                    ...item,
                    isSelected: false
                }))
            }
            this.setState({
                scheduleTimesArr: data
            }, () => {
                console.log("mảng lịch khám là: ", data)
            })
        }
        if (prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildInputData(this.props.allDoctorsRedux)
            this.setState({
                listDoctors: dataSelect,
            })
        }
    }

    buildInputData = (inputData) => {
        let { lang } = this.props

        if (inputData && inputData.length > 0) {
            let result = inputData.map((item) => {
                let label = lang === LANGUAGES.VI ?
                    `${item.lastName} ${item.firstName}` :
                    `${item.firstName} ${item.lastName}`
                let value = item.id
                return {
                    label: label,
                    value: value
                }
            })
            return result
        }
    }

    handleChangeSelect = async (selectedDoctor) => {
        let data = this.state.scheduleTimesArr.map(item => ({
            ...item,
            isSelected: false
        }));
        this.setState({
            scheduleTimesArr: data,
            selectedDoctor,
            currentDate: ''
        })
    };

    handleGetSchedule = async (selectedDoctor, formatDate) => {
        let resp = await userService.getScheduleByDateService(selectedDoctor.value, formatDate);
        console.log("resp doctor", resp)
        if (resp && resp.errCode === 0 && resp.data.length > 0) {
            let data = this.state.scheduleTimesArr;
            let arrTimeType = resp.data.map(item => item.timeType);
            let arrNew = [];
            arrTimeType.forEach(item => {
                arrNew = data.map(x => {
                    if (item === x.keyMap) x.isSelected = true;
                    return x;
                })
            })
            this.setState({
                scheduleTimesArr: arrNew,
                hasOldData: true
            })
        } else {
            let data = this.state.scheduleTimesArr.map(item => ({
                ...item,
                isSelected: false
            }));
            this.setState({
                scheduleTimesArr: data,
                hasOldData: false
            })
        }

    }

    handleChangeDate = async (date) => {
        let selectedDoctor = this.state.selectedDoctor;
        if (selectedDoctor === '') {
            alert("please choose doctor")
            return
        }
        let formatDate = new Date(date[0]).getTime();
        this.handleGetSchedule(selectedDoctor, formatDate)
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTime = (time) => {
        let { scheduleTimesArr } = this.state
        if (scheduleTimesArr && scheduleTimesArr.length > 0) {

            scheduleTimesArr = scheduleTimesArr.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            this.setState({
                scheduleTimesArr
            })
        }
    }

    handleSaveSchedule = () => {
        let { scheduleTimesArr, currentDate, selectedDoctor, hasOldData } = this.state
        if (!currentDate) {
            toast.error("Invalid date")
            return
        }
        if (selectedDoctor === "" || _.isEmpty(selectedDoctor)) {
            toast.error("Invalid select doctor")
            return
        }

        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatDate = new Date(currentDate).getTime()
        let result = [];
        if (scheduleTimesArr && scheduleTimesArr.length > 0) {
            let selectedTimes = scheduleTimesArr.filter(item => item.isSelected === true)
            if (selectedTimes && selectedTimes.length > 0) {
                result = selectedTimes.map(item => ({
                    doctorId: selectedDoctor.value,
                    date: formatDate,
                    timeType: item.keyMap,
                }))
            } else {
                toast.error("Invalid select time")
                return
            }
        }
        if (result.length === 0) {
            alert("please choose time")
            return
        }

        this.props.saveScheduleDoctor({
            hasOldData,
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatDate
        })
        let data = this.state.scheduleTimesArr.map(item => ({
            ...item,
            isSelected: false
        }));
        this.setState({
            scheduleTimesArr: data,
            selectedDoctor: '',
            hasOldData: false,
            currentDate: moment(new Date().setHours(0, 0, 0, 0))._d,
        })
    }

    render() {
        const { lang } = this.props;
        const { selectedDoctor, listDoctors, hasOldData, currentDate, scheduleTimesArr } = this.state;
        let today = new Date();
        let yesterday = new Date(today.setDate(today.getDate() - 1))
        return (
            <div className="manage_schedule-container">
                <h2 className="text-center title"><FormattedMessage id="menu.doctor.manage-schedule" /></h2>
                <div className="manage_schedule-inputs">
                    <div className="row">
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.admin.manageDoctor.select-doctor" /></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={listDoctors}
                            />
                        </div>
                        <div className="col form-group">
                            <label><FormattedMessage id="menu.doctor.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleChangeDate}
                                className="form-control"
                                value={currentDate}
                                minDate={yesterday}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col form-group pick-times'>
                            {
                                scheduleTimesArr && scheduleTimesArr.length > 0 &&
                                scheduleTimesArr.map((item) => (
                                    <button
                                        className={item.isSelected ? 'btn-time active' : 'btn-time'}
                                        key={item.keyMap}
                                        onClick={() => this.handleClickTime(item)}
                                    >
                                        {lang === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <button
                    onClick={this.handleSaveSchedule}
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
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        scheduleTimesRedux: state.admin.scheduleTimes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        fetchScheduleTimeStart: () => dispatch(actions.fetchScheduleTimeStart()),
        saveScheduleDoctor: (data) => dispatch(actions.saveScheduleDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
