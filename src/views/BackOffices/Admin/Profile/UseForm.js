import React from "react"
import {
    CCard,
    CCardBody,
} from '@coreui/react'
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";

const reg = /^\d+$/;
const schema = yup.object().shape({
    firstName: yup.string()
        .required("first name is a required field")
        .min(4,"full name must be at least 4 characters")
        .max(55,"full name must be at most 55 characters"),
    lastName: yup.string()
        .required("last name is a required field")
        .min(4,"last name must be at least 4 characters")
        .max(55,"last name must be at most 55 characters"),
    email:yup.string().email().required(),
    cinNumber:yup.string().matches(reg,"cin must be a number").required().length(8),
});
const UseForm = ({onSubmit,preloadedValues,loading}) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues:preloadedValues,
        resolver: yupResolver(schema)
    });

    return (
        <>
            <CCard >
                <CCardBody >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input type="text" className="form-control"     style={errors.firstName?inputBorderErrorsStyle:null} {...register("firstName")}  placeholder={"Enter your First Name"}/>
                                <p style={errorsStyle}>{errors.firstName?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <input type="text" className="form-control"     style={errors.lastName?inputBorderErrorsStyle:null} {...register("lastName")}  placeholder={"Enter your Last Name"}/>
                                <p style={errorsStyle}>{errors.lastName?.message}</p>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" className="form-control"   style={errors.email?inputBorderErrorsStyle:null} {...register("email")}  placeholder={"Enter your email"}/>
                                <p style={errorsStyle}>{errors.email?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Cin Number</label>
                                <input type="number" className="form-control"    style={errors.cinNumber?inputBorderErrorsStyle:null} {...register("cinNumber")}  placeholder={"Enter your cin number"}/>
                                <p style={errorsStyle}>{errors.cinNumber?.message}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Phone</label>
                                <input type="number" className="form-control"     style={errors.phone?inputBorderErrorsStyle:null} {...register("phone")}  placeholder={"Enter your Phone"}/>
                                <p style={errorsStyle}>{errors.phone?.message}</p>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Birthday</label>
                                <input type="date" className="form-control" max={new Date().getFullYear()-18+"-12-31"} style={errors.birthday?inputBorderErrorsStyle:null} {...register("birthday") } />
                                <p style={errorsStyle}>{errors.birthday?.message}</p>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} >Save
                            {loading && (
                                <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                  size={20}
                                />
                            )}
                        </button>
                    </form>
                </CCardBody>

            </CCard>

        </>
    )
}

export default UseForm;
