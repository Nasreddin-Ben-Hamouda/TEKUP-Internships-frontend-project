import axios from "../../../axios/web-service"
import * as actionTypes from "./actionTypes"

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (user,authToken,redirect) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user:user,
        authToken:authToken,
        redirect:redirect
    };
};

export const loginFail = () => {
    return {
        type: actionTypes.LOGIN_FAIL,
    };
};
export const authFinish = () => {
    return {
        type: actionTypes.AUTH_FINISH,
    };
};
export const takeReadyTrue=()=>{
    return {
        type: actionTypes.TAKE_READY_TRUE,
    };
}
export const takeReadyFalse=()=>{
    return {
        type: actionTypes.TAKE_READY_FALSE,
    };
}

export const updateUser=(user)=>{
    return {
        type: actionTypes.UPDATE_USER,
        user:user
    };
}

export const logout = () => {
    localStorage.removeItem('authToken');
    return {
        type: actionTypes.AUTH_LOGOUT
    };

};

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        const data = {
            email: email,
            password: password
        };
        axios.post('/auth/login', data)
            .then(response => {
                localStorage.setItem('authToken', response.data.authToken);
                let redirect = null;
                if (response.data.role === "ADMIN") {
                    redirect = "/administrator"
                } else {
                    if (response.data.role === "TEACHER") {
                        redirect = "/teacher"
                    } else {
                        redirect = "/student"
                    }
                }
                dispatch(loginSuccess(
                    {
                        id: response.data.id,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        role: response.data.role
                    },
                    response.data.authToken,
                    redirect));
            })
            .catch(err => {
                dispatch(loginFail());
            });
    };
};

export const getAuthenticatedUser = () => {
    return (dispatch) => {
            dispatch(takeReadyFalse())
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                dispatch(logout());
            } else {
                axios.get('/auth/whoami')
                    .then((response) => {
                        dispatch(loginSuccess(response.data,authToken,null));
                        dispatch(takeReadyTrue())
                    })
                    .catch(()=>{
                        dispatch(takeReadyTrue())
                    })


            }

    };
};
