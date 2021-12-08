import React, { useState} from 'react'
import UseForm from './UseForm'
import UsePasswordForm from './UsePasswordForm'
import {
    CSpinner,
    CRow,
    CCol,
    CCard
} from '@coreui/react'
import axios from '../../../../axios/web-service'
import cogoToast from 'cogo-toast';
import UserCard from "./UserCard";
import {useDispatch,useSelector} from "react-redux";
import * as actions from "../../../../store/actions/auth/User"
const Profile = () => {
    const dispatch= useDispatch()
    const user=useSelector(state=>state.user.user);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const onSubmitFormInformation = (data) => {
        console.log(data)
        setLoadingInfo(true)
        axios.put('/auth/updateUserCredentials',data)
             .then((response)=>{
                 cogoToast.success("Profile updated successfully", {position: "top-right"})
                 setLoadingInfo(false);
                 dispatch(actions.updateUser(response.data));
             })
            .catch(()=>{
                setLoadingInfo(false);
            })
    };
    const onSubmitFormPassword = (data) => {
        setLoadingPassword(true)
        axios.put('/auth/updateUserPassword',data)
            .then((response)=>{
                cogoToast.success("Password updated successfully", {position: "top-right"})
                setLoadingPassword(false);
                dispatch(actions.updateUser(response.data));
            })
            .catch(()=>{
                setLoadingPassword(false);
            })
    };
    const onChangeImageHandler=(event)=>{
        //cogoToast.error(event.target.files[0].size, {position: "top-right"})
        if(event.target.files[0]){
            const file = event.target.files[0];
            if (file.size >10.E7)
                cogoToast.error("Image size cannot exceed more than 10MB", {position: "top-right"})
            else{
                setSelectedFile(event.target.files[0]);
                const data = new FormData();
                data.append('file', event.target.files[0])
                axios.put('/auth/updateUserPhoto',data)
                    .then((response)=>{
                        cogoToast.success("Avatar updated successfully", {position: "top-right"})
                        dispatch(actions.updateUser(response.data));
                    })

            }
        }

    }
    return (
        <>
            {
                user ?

                    <CCard style={{borderRadius: "20px"}}>
                        <CRow>
                            <CCol xs="12" sm="12" md="12">
                                <UserCard change={onChangeImageHandler} image={selectedFile} avatar={user.photo}/>
                            </CCol>
                        </CRow>

                        <CRow style={{marginLeft: "1%", marginRight: "1%", marginTop: "5%"}}>

                            <CCol xs="12" sm="12" md="6">
                                <UseForm
                                    preloadedValues={
                                        {
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email,
                                            phone: user.phone,
                                            cinNumber:user.cinNumber,
                                            birthday:user.birthday?user.birthday.slice(0,10):""
                                        }}
                                    loading={loadingInfo} onSubmit={onSubmitFormInformation}/>
                            </CCol>
                            <CCol xs="12" sm="12" md="6">
                                <UsePasswordForm loading={loadingPassword} onSubmit={onSubmitFormPassword}/>
                            </CCol>


                        </CRow>
                    </CCard>

                    :
                    <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
            }
        </>
    )
}

export default Profile;
