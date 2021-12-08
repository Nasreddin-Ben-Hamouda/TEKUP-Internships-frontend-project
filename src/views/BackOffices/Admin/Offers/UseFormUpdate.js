import React from "react"
import { CircularProgress} from "@material-ui/core";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {errorsStyle,inputBorderErrorsStyle} from "../../../../helpers/utility";
import {DropzoneArea} from "material-ui-dropzone";

const schema = yup.object().shape({
    title:yup.string().required("Title is a required field")
        .max(55,"title must be at most 55 characters"),
    description:yup.string().required("Description is a required field")
});
const UseFormUpdate = ({preloadedValues,onSubmit,loading,debounceKey,dropZoneOnChange}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues:preloadedValues,
        resolver: yupResolver(schema)
    });
            const initialFiles=[]
            const url=process.env.REACT_APP_BACKEND_WEB_SERVICE+"/uploads/offers/";
            preloadedValues.attachementsDTO.forEach((attachment)=>{
                initialFiles.push(url+attachment.path);
            })

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Title</label>
                        <input type="text" className="form-control"
                               style={errors.title ? inputBorderErrorsStyle : null} {...register("title")}
                               placeholder={"Enter the title of the offer"}/>
                        <p style={errorsStyle}>{errors.title?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Description</label>
                        <textarea rows="5" className="form-control"
                                  style={errors.description ? inputBorderErrorsStyle : null} {...register("description")}
                                  placeholder={"Fill in description of the offer"}/>
                        <p style={errorsStyle}>{errors.description?.message}</p>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Attachments</label>
                        <DropzoneArea
                            key={debounceKey}
                            showAlerts={['error']}
                            showPreviews={false}
                            onChange={(files)=>dropZoneOnChange(files)}
                            maxFileSize={3e+7}
                            initialFiles={initialFiles}
                        />
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

export default UseFormUpdate;
