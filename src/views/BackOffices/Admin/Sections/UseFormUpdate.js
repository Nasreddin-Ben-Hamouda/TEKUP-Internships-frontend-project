import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";

const schema = yup.object().shape({
    title: yup.string().required().min(4).max(55),
});
const UseFormUpdate = ({preloadedValues,onSubmit,loading}) => {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues:preloadedValues,
        resolver: yupResolver(schema)
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Title</label>
                        <input type="text" className="form-control"     style={errors.title?inputBorderErrorsStyle:null} {...register("title")}  placeholder={"Enter the title of section"}/>
                        <p style={errorsStyle}>{errors.title?.message}</p>
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
        </>
    )
}

export default UseFormUpdate;
