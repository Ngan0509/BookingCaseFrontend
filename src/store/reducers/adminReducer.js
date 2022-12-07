import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    allUsers: [],
    topDoctors: [],
    allDoctors: [],
    doctorPrices: [],
    doctorPayments: [],
    doctorProvinces: [],
    scheduleTimes: [],
    topSpecialtys: [],
    allSpecialty: [],
    topClinics: [],
    allClinic: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                genders: action.data
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoading: false,
                genders: []
            }
        //-------------------------------------------------
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                positions: action.data
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                isLoading: false,
                positions: []
            }
        //-----------------------------------------------
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: action.data
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                isLoading: false,
                roles: []
            }

        //-----------------------------------------

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            return {
                ...state,
                allUsers: action.data
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            return {
                ...state,
                allUsers: []
            }

        //-------------------------------------------

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctors: action.data
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            return {
                ...state,
                topDoctors: []
            }

        //------------------------------------------------

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctors: action.data
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            return {
                ...state,
                allDoctors: []
            }

        // ------------------------------------------------

        case actionTypes.FETCH_SCHEDULE_TIME_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                scheduleTimes: action.data
            }
        case actionTypes.FETCH_SCHEDULE_TIME_FAILED:
            return {
                ...state,
                isLoading: false,
                scheduleTimes: []
            }

        //-----------------------------------------------

        case actionTypes.FETCH_PRICE_DOCTOR_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_PRICE_DOCTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                doctorPrices: action.data
            }
        case actionTypes.FETCH_PRICE_DOCTOR_FAILED:
            return {
                ...state,
                isLoading: false,
                doctorPrices: []
            }

        //---------------------------------------------------

        case actionTypes.FETCH_PAYMENT_DOCTOR_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_PAYMENT_DOCTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                doctorPayments: action.data
            }
        case actionTypes.FETCH_PAYMENT_DOCTOR_FAILED:
            return {
                ...state,
                isLoading: false,
                doctorPayments: []
            }

        //-----------------------------------------------------

        case actionTypes.FETCH_PROVINCE_DOCTOR_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FETCH_PROVINCE_DOCTOR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                doctorProvinces: action.data
            }
        case actionTypes.FETCH_PROVINCE_DOCTOR_FAILED:
            return {
                ...state,
                isLoading: false,
                doctorProvinces: []
            }

        //-------------------------------------------------

        case actionTypes.FETCH_TOP_SPECIALTY_SUCCESS:
            return {
                ...state,
                topSpecialtys: action.data
            }
        case actionTypes.FETCH_TOP_SPECIALTY_FAILED:
            return {
                ...state,
                topSpecialtys: []
            }

        //------------------------------------------------

        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            return {
                ...state,
                allSpecialty: action.data
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            return {
                ...state,
                allSpecialty: []
            }

        //-------------------------------------------------

        case actionTypes.FETCH_TOP_CLINIC_SUCCESS:
            return {
                ...state,
                topClinics: action.data
            }
        case actionTypes.FETCH_TOP_CLINIC_FAILED:
            return {
                ...state,
                topClinics: []
            }

        //------------------------------------------------

        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            return {
                ...state,
                allClinic: action.data
            }
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            return {
                ...state,
                allClinic: []
            }

        default:
            return state;
    }
}

export default adminReducer;