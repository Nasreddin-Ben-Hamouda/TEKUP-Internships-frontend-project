import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";
const schema = yup.object().shape({
    firstName:yup.string().required("first name is a required field")
            .min(4,"first name must be at least 4 characters")
            .max(55,"first name must be at most 55 characters"),
    lastName:yup.string().required("last name is a required field")
        .min(4,"last name must be at least 4 characters")
        .max(55,"last name must be at most 55 characters"),
    password:yup.string().required().min(6).max(55),
    cinNumber:yup.string().max(8),
    email:yup.string().email().required(),
    phone:yup.string().max(8),
    class:yup.string().required()
});
const UseForm = ({onSubmit,loading,classes}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="form-row">
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name *</label>
                        <input type="text" className="form-control"
                               style={errors.firstName ? inputBorderErrorsStyle : null} {...register("firstName")}
                               placeholder={"Enter the first name"}/>
                        <p style={errorsStyle}>{errors.firstName?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name *</label>
                        <input type="text" className="form-control"
                               style={errors.lastName ? inputBorderErrorsStyle : null} {...register("lastName")}
                               placeholder={"Enter the last name"}/>
                        <p style={errorsStyle}>{errors.lastName?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Email *</label>
                        <input type="email" className="form-control" autoComplete="off"
                               style={errors.email ? inputBorderErrorsStyle : null} {...register("email")}
                               placeholder={"Enter your email"}/>
                        <p style={errorsStyle}>{errors.email?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Password *</label>
                        <input type="password" className="form-control" autoComplete="off"
                               style={errors.password ? inputBorderErrorsStyle : null} {...register("password")}
                               placeholder={"Enter your password"}/>
                        <p style={errorsStyle}>{errors.password?.message}</p>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Cin Number</label>
                        <input type="number" className="form-control"
                               style={errors.cinNumber ? inputBorderErrorsStyle : null} {...register("cinNumber")}
                               placeholder={"Enter the cin number"}/>
                        <p style={errorsStyle}>{errors.cinNumber?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="number" className="form-control"
                               style={errors.phone ? inputBorderErrorsStyle : null} {...register("phone")}
                               placeholder={"Enter your phone"}/>
                        <p style={errorsStyle}>{errors.phone?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Class</label>
                        <select className="form-control"   style={errors.class?inputBorderErrorsStyle:null} {...register("class")} >
                            {classes? classes.map((classe,index)=>{
                                return (<option key={index}  value={classe.id} >{classe.name}</option>)
                            }):null}
                        </select>
                        <p style={errorsStyle}>{errors.class?.message}</p>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Save
                    {loading && (
                        <CircularProgress style={{marginLeft: "10px", color: "white"}}

                                          size={20}
                        />
                    )}
                </button>
            </form>
        </>
    )
}

export default UseForm;
