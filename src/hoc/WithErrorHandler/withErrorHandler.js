
import * as actions from "../../store/actions/auth/User";
import useHttpErrorHandler from '../../helpers/http-error-handler';
import cogoToast from 'cogo-toast';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const dispatch = useDispatch();
        const [error, clearError] = useHttpErrorHandler(axios);
        useEffect(()=>{
            if(error){
                if(error.status){
                    switch (error.status){
                        case 500:cogoToast.error("Server is down",{position:"top-right"}).then(clearError);
                            break;
                        case 400:cogoToast.error(error.data ?error.data:"Something went wrong",{position:"top-right"}).then(clearError);
                            break;
                        case 404:cogoToast.error(error.data?error.data:"Not Found Error",{position:"top-right"}).then(clearError);
                            break;
                        case 401 :{
                            cogoToast.error("Sign in please",{position:"top-right"}).then(clearError)
                            dispatch(actions.logout());
                            break;
                        }
                        default:cogoToast.error("Something went wrong,please refresh the page",{position:"top-right"}).then(clearError);
                    }
                }else{
                    cogoToast.error(error,{position:"top-right"}).then(clearError)
                }

            }
        },[error,clearError,dispatch])



        return (
                <WrappedComponent {...props} />
        );
    };
};

export default withErrorHandler;
