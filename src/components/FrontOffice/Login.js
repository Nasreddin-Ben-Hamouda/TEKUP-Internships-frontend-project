import React,{useState,useRef} from "react";
import "../../styles/FrontOffice/Auth/_app.scss";
import {Checkbox, FormControlLabel, Grid, Button,CircularProgress} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import img from "../../assets/FrontOffice/img/intern.jpg"
import * as actions from "../../store/actions/auth/User";
import {useDispatch, useSelector} from "react-redux";
const Login=(props)=>{
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.loading)
    const [useForm,setForm] = useState({
        email: "",
        password: "",
        remember: false
    })
    let { email, password ,remember} = useForm;

    const handleChange = event => {
           event.persist();
           if(event.target.name==="remember"){
               setForm({
                   ...useForm,
                   [event.target.name]: !useForm.remember
               });
           }else{
               setForm({
                   ...useForm,
                   [event.target.name]: event.target.value
               });
           }

    };
    const handleFormSubmit = ()=> {
       dispatch(actions.login(useForm.email,useForm.password));

    };
    const buttonStyle=!loading?{backgroundColor:"#5ca9fb",color:"white"}: null
    return (
                        <Grid container >
                            <Grid item lg={5} md={5} sm={5} xs={12}>

                                <div className="p-8 flex justify-center items-center h-full">

                                    <img
                                        src={img}
                                        alt=""
                                        style={{marginTop:"-10px",height:"100%"}}
                                    />

                                </div>

                            </Grid>

                            <Grid item lg={7} md={7} sm={7} xs={12}>

                                <div className="p-12 h-full" style={{marginTop:"35px"}} >
                                    <ValidatorForm ref={useRef('form')} onSubmit={handleFormSubmit}>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Email"
                                            onChange={handleChange}
                                            type="email"
                                            name="email"
                                            value={email}
                                            validators={["required", "isEmail"]}
                                            errorMessages={[
                                                "this field is required",
                                                "email is not valid"
                                            ]}
                                        />
                                        <TextValidator
                                            className="mb-6 w-full"
                                            label="Password"
                                            variant="outlined"
                                            onChange={handleChange}
                                            name="password"
                                            type="password"
                                            value={password}
                                            validators={["required","minStringLength: 7","maxStringLength: 15"]}
                                            errorMessages={
                                                [
                                                    "this field is required",
                                                    "this field must be longer than 6 characters",
                                                    "this field must not exceed 15 characters"
                                                ]
                                            }
                                        />
                                        <div className="flex items-center">
                                            <FormControlLabel
                                                className="mb-4"
                                                name="remember"
                                                onChange={handleChange}
                                                control={<Checkbox checked={remember} style={{color:"#5ca9fb"}} />}
                                                label="Remember me."
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <br/>
                                            <Button
                                                className="capitalize"
                                                variant="contained"
                                                style={buttonStyle}
                                                disabled={loading}
                                                type="submit"
                                            >
                                                Sign in
                                                {loading && (
                                                    <CircularProgress style={{marginLeft:"10px",color:"white"}}

                                                                      size={20}
                                                    />
                                                )}

                                            </Button>
                                        </div>
                                    </ValidatorForm>
                                </div>

                            </Grid>
                        </Grid>


        );

}

export default Login;
