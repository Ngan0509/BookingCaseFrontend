import axios from "../axios";

const handleLogin = (email, password) => {
    console.log(email, password)
    return axios.post('/api/login', { email, password })
}

const getAllUser = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`)
}

const updateUserService = (editData) => {
    return axios.put('/api/edit-user', editData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/get-all-code?type=${inputType}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorsService = () => {
    return axios.get('/api/get-all-doctors')
}

const saveInfoDoctorService = (data) => {
    return axios.post('/api/save-info-doctor', data)
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor?doctorId=${inputId}`)
}

const saveScheduleDoctorService = (data) => {
    return axios.post('/api/bulk-schedule-doctor', data)
}

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const deleteDateOldService = () => {
    return axios.delete('/api/delete-date-old')
}

const getAddressInfoDoctorService = (inputId) => {
    return axios.get(`/api/get-address-info-doctor?doctorId=${inputId}`)
}

const getProfileDoctorService = (inputId) => {
    return axios.get(`/api/get-profile-doctor?doctorId=${inputId}`)
}

const saveBookingOfPatientService = (data) => {
    return axios.post('/api/save-booking-patient', data)
}

const postBookingAppointment = (data) => {
    return axios.post('/api/verify-booking-appointment', data)
}

const saveInfoSpecialtyService = (data) => {
    return axios.post('/api/save-info-specialty', data)
}

const getTopSpecialtyService = (limit) => {
    return axios.get(`/api/top-specialty-home?limit=${limit}`)
}

const getAllSpecialtyService = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailInfoSpecialty = (inputId, location) => {
    return axios.get(`/api/get-detail-specialty?specialtyId=${inputId}&location=${location}`)
}

const saveInfoClinicService = (data) => {
    return axios.post('/api/save-info-clinic', data)
}

const getTopClinicService = (limit) => {
    return axios.get(`/api/top-clinic-home?limit=${limit}`)
}

const getAllClinicService = () => {
    return axios.get('/api/get-all-clinic')
}

const getDetailInfoClinic = (inputId, location) => {
    return axios.get(`/api/get-detail-clinic?clinicId=${inputId}}&location=${location}`)
}

const getListPatientForDoctor = (doctorId, date) => {
    return axios.get(`/api/get-list-patient?doctorId=${doctorId}&date=${date}`)
}

const sendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}

export {
    handleLogin, getAllUser, createNewUserService, deleteUserService, updateUserService,

    getAllCodeService, getTopDoctorService, getAllDoctorsService, saveInfoDoctorService,

    getDetailInfoDoctor, saveScheduleDoctorService, getScheduleByDateService, deleteDateOldService, getAddressInfoDoctorService,

    getProfileDoctorService, saveBookingOfPatientService, postBookingAppointment, saveInfoSpecialtyService,

    getTopSpecialtyService, getAllSpecialtyService, getDetailInfoSpecialty, saveInfoClinicService,

    getTopClinicService, getAllClinicService, getDetailInfoClinic, getListPatientForDoctor,

    sendRemedy
}