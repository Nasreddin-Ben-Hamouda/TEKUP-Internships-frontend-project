import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";

const schema = yup.object().shape({
    name: yup.string().required().min(4).max(55),
    section:yup.string().required(),
    level:yup.string().required()
});
const UseFormUpdate = ({preloadedValues,sections,onSubmit,loading}) => {

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
                        <label>Name</label>
                        <input type="text" className="form-control"     style={errors.name?inputBorderErrorsStyle:null} {...register("name")}  placeholder={"Enter the name of class"}/>
                        <p style={errorsStyle}>{errors.name?.message}</p>
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Section</label>
                        <select className="form-control" style={errors.section?inputBorderErrorsStyle:null} {...register("section")} >
                            {sections? sections.map((section,index)=>{
                                return (<option key={index}  value={section.id} >{section.title}</option>)
                            }):null}
                        </select>
                        <p style={errorsStyle}>{errors.section?.message}</p>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Level</label>
                        <select className="form-control"   style={errors.level?inputBorderErrorsStyle:null} {...register("level")} >

                            {[...Array(5)].map((x, i) =>
                                <option key={i}  value={i+1}>{i+1}</option>
                            )}

                        </select>
                        <p style={errorsStyle}>{errors.level?.message}</p>
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
