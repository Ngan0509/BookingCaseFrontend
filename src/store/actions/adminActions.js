import actionTypes from './actionTypes';
import * as userService from "../../services/userService"
import { toast } from "react-toastify";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let resp = await userService.getAllCodeService("GENDER")
            if (resp && resp.errCode === 0) {
                dispatch(fetchGenderSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchGenderFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchGenderFailed())

        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



//--------------------------------------------------------



export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let resp = await userService.getAllCodeService("POSITION")
            if (resp && resp.errCode === 0) {
                dispatch(fetchPositionSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchPositionFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchPositionFailed())

        }
    }
}

export const fetchPositionSuccess = (PositionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: PositionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


//--------------------------------------------------------


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let resp = await userService.getAllCodeService("ROLE")
            if (resp && resp.errCode === 0) {
                dispatch(fetchRoleSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchRoleFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchRoleFailed())

        }
    }
}

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//-------------------------------------------------------------

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.createNewUserService(data)
            if (resp && resp.errCode === 0) {
                dispatch(createUserSuccess())
                toast.success(resp.errMessage)
                dispatch(fetchAllUserStart())
            } else {
                dispatch(createUserFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(createUserFailed())
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

//--------------------------------------------------------

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getAllUser('All')
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllUserSuccess(resp.users))
            } else {
                dispatch(fetchAllUserFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSuccess = (AllUserData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: AllUserData
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

//--------------------------------------------------

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.deleteUserService(userId)
            if (resp && resp.errCode === 0) {
                dispatch(deleteUserSuccess())
                toast.success(resp.errMessage)
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(deleteUserFailed())
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

//--------------------------------------------------

export const updateUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.updateUserService(data)
            if (resp && resp.errCode === 0) {
                dispatch(updateUserSuccess())
                toast.success(resp.errMessage)
                dispatch(fetchAllUserStart())
            } else {
                dispatch(updateUserFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(updateUserFailed())
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

//-----------------------------------------------

export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getTopDoctorService(10)
            if (resp && resp.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(resp.data))
            } else {
                dispatch(fetchTopDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchTopDoctorFailed())
        }
    }
}

export const fetchTopDoctorSuccess = (TopDoctorData) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: TopDoctorData
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})

//-------------------------------------------------------

export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getAllDoctorsService()
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(resp.data))
            } else {
                dispatch(fetchAllDoctorsFailed())
            }
        } catch (error) {
            dispatch(fetchAllDoctorsFailed())
        }
    }
}

export const fetchAllDoctorsSuccess = (AllDoctorsData) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: AllDoctorsData
})

export const fetchAllDoctorsFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})

//---------------------------------------------------

export const fetchPriceDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_PRICE_DOCTOR_START })
            let resp = await userService.getAllCodeService("PRICE")
            if (resp && resp.errCode === 0) {
                dispatch(fetchPriceDoctorSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchPriceDoctorFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchPriceDoctorFailed())

        }
    }
}

export const fetchPriceDoctorSuccess = (PriceDoctorData) => ({
    type: actionTypes.FETCH_PRICE_DOCTOR_SUCCESS,
    data: PriceDoctorData
})

export const fetchPriceDoctorFailed = () => ({
    type: actionTypes.FETCH_PRICE_DOCTOR_FAILED
})

//--------------------------------------------------------

export const fetchPaymentDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_PAYMENT_DOCTOR_START })
            let resp = await userService.getAllCodeService("PAYMENT")
            if (resp && resp.errCode === 0) {
                dispatch(fetchPaymentDoctorSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchPaymentDoctorFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchPaymentDoctorFailed())

        }
    }
}

export const fetchPaymentDoctorSuccess = (PaymentDoctorData) => ({
    type: actionTypes.FETCH_PAYMENT_DOCTOR_SUCCESS,
    data: PaymentDoctorData
})

export const fetchPaymentDoctorFailed = () => ({
    type: actionTypes.FETCH_PAYMENT_DOCTOR_FAILED
})
//------------------------------------------------------

export const fetchProvinceDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_PROVINCE_DOCTOR_START })
            let resp = await userService.getAllCodeService("PROVINCE")
            if (resp && resp.errCode === 0) {
                dispatch(fetchProvinceDoctorSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchProvinceDoctorFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchProvinceDoctorFailed())

        }
    }
}

export const fetchProvinceDoctorSuccess = (ProvinceDoctorData) => ({
    type: actionTypes.FETCH_PROVINCE_DOCTOR_SUCCESS,
    data: ProvinceDoctorData
})

export const fetchProvinceDoctorFailed = () => ({
    type: actionTypes.FETCH_PROVINCE_DOCTOR_FAILED
})

//------------------------------------------------------

export const saveInfoDoctorUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.saveInfoDoctorService(data)
            if (resp && resp.errCode === 0) {
                dispatch(saveInfoDoctorSuccess())
                toast.success(resp.errMessage)
            } else {
                dispatch(saveInfoDoctorFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(saveInfoDoctorFailed())
        }
    }
}

export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS
})

export const saveInfoDoctorFailed = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAILED
})

// ---------------------------------------------------

export const fetchScheduleTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_SCHEDULE_TIME_START })
            let resp = await userService.getAllCodeService("TIME")
            if (resp && resp.errCode === 0) {
                dispatch(fetchScheduleTimeSuccess(resp.data))
                toast.success(resp.errMessage)
            } else {
                dispatch(fetchScheduleTimeFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(fetchScheduleTimeFailed())

        }
    }
}

export const fetchScheduleTimeSuccess = (ScheduleTimeData) => ({
    type: actionTypes.FETCH_SCHEDULE_TIME_SUCCESS,
    data: ScheduleTimeData
})

export const fetchScheduleTimeFailed = () => ({
    type: actionTypes.FETCH_SCHEDULE_TIME_FAILED
})

//-------------------------------------------------------------------

export const saveScheduleDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.saveScheduleDoctorService(data)
            if (resp && resp.errCode === 0) {
                dispatch(saveScheduleDoctorSuccess())
                toast.success(resp.errMessage)
            } else {
                dispatch(saveScheduleDoctorFailed())
                toast.error(resp.errMessage)
            }
        } catch (error) {
            dispatch(saveScheduleDoctorFailed())
        }
    }
}

export const saveScheduleDoctorSuccess = () => ({
    type: actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS
})

export const saveScheduleDoctorFailed = () => ({
    type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED
})

// specialty ----------------------------------------------

export const fetchTopSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getTopSpecialtyService(8)
            if (resp && resp.errCode === 0) {
                dispatch(fetchTopSpecialtySuccess(resp.data))
            } else {
                dispatch(fetchTopSpecialtyFailed())
            }
        } catch (error) {
            dispatch(fetchTopSpecialtyFailed())
        }
    }
}

export const fetchTopSpecialtySuccess = (TopSpecialtyData) => ({
    type: actionTypes.FETCH_TOP_SPECIALTY_SUCCESS,
    data: TopSpecialtyData
})

export const fetchTopSpecialtyFailed = () => ({
    type: actionTypes.FETCH_TOP_SPECIALTY_FAILED
})

//--------------------------------------------------

export const fetchAllSpecialtyStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getAllSpecialtyService()
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllSpecialtySuccess(resp.data))
            } else {
                dispatch(fetchAllSpecialtyFailed())
            }
        } catch (error) {
            dispatch(fetchAllSpecialtyFailed())
        }
    }
}

export const fetchAllSpecialtySuccess = (AllSpecialtyData) => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
    data: AllSpecialtyData
})

export const fetchAllSpecialtyFailed = () => ({
    type: actionTypes.FETCH_ALL_SPECIALTY_FAILED
})

// clinic ----------------------------------------------

export const fetchTopClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getTopClinicService(8)
            if (resp && resp.errCode === 0) {
                dispatch(fetchTopClinicSuccess(resp.data))
            } else {
                dispatch(fetchTopClinicFailed())
            }
        } catch (error) {
            dispatch(fetchTopClinicFailed())
        }
    }
}

export const fetchTopClinicSuccess = (TopClinicData) => ({
    type: actionTypes.FETCH_TOP_CLINIC_SUCCESS,
    data: TopClinicData
})

export const fetchTopClinicFailed = () => ({
    type: actionTypes.FETCH_TOP_CLINIC_FAILED
})

//--------------------------------------------------

export const fetchAllClinicStart = () => {
    return async (dispatch, getState) => {
        try {
            let resp = await userService.getAllClinicService()
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllClinicSuccess(resp.data))
            } else {
                dispatch(fetchAllClinicFailed())
            }
        } catch (error) {
            dispatch(fetchAllClinicFailed())
        }
    }
}

export const fetchAllClinicSuccess = (AllClinicData) => ({
    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
    data: AllClinicData
})

export const fetchAllClinicFailed = () => ({
    type: actionTypes.FETCH_ALL_CLINIC_FAILED
})