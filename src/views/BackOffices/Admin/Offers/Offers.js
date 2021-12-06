import React,{useState,useEffect} from 'react'
import { useDebounce } from 'use-debounce';
import {
    CCardBody,CCard,
    CCardText,CCardTitle,
    CCardFooter,
    CRow,CCol,
    CButton,CModal,CModalHeader,CModalBody,CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "../../../../axios/web-service"
import { Popconfirm } from 'antd'
import "antd/dist/antd.css";
import UseForm from "./UseForm"
import UseFormUpdate from "./UseFormUpdate"
import cogoToast from 'cogo-toast';
import {useSelector} from "react-redux";
const Offers=(props)=>{
    const user=useSelector(state=>state.user.user);
    const [offers, setOffers] = useState(null);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [key, setKey] = useState(0);
    const [debounceKey] = useDebounce(key, 1);
    useEffect(() => {
        getAllOffers();
    }, []);

    const getAllOffers = () => {
        axios.get('/offer/list')
            .then((response) => {
                setOffers(response.data);
            })
    }
    const modalCloseHandle = () => {
        setFormUpdate(null)
        setVisible(false);
    }
    const onSubmitAddForm = (data,e) => {
        setLoading(true)
        data={
            ...data,
        }
        const form = new FormData();
        for(let key in data){
            form.append(key,data[key]);
        }
        selectedFiles.forEach((file,i)=>{
            form.append(`attachmentsRequest[${i}]`,file);
        })
        axios.post('/offer/create', form)
            .then(() => {
                setLoading(false)
                cogoToast.success("Offer created successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                setKey(!key);
                getAllOffers()
            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const onSubmitUpdateForm = (data,e) => {
        setLoading(true)
        data={
            id:data.id,
            title:data.title,
            description:data.description
        }
        const form = new FormData();
        for(let key in data){
            form.append(key,data[key]);
        }
        selectedFiles.forEach((file,i)=>{
            form.append(`attachmentsRequest[${i}]`,file);
        })
        axios.put(`/offer/${data.id}/update`, form)
            .then(() => {
                setLoading(false)
                cogoToast.success("Offer updated successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                setKey(!key);
                getAllOffers()
            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const showUpdateForm = (id) => {
        const index = offers.findIndex((offer) => offer.id === id);
        const offer={
            ...offers[index],
        }
        setFormUpdate(offer)
        setVisible(true)
    }
    const deleteOfferHandler = (id) => {

        axios.delete(`/offer/${id}/delete`)
            .then(() => {
                cogoToast.success("Offer deleted successfully", {position: "top-right"})
                getAllOffers();
            })
    }
    const dropZoneOnChange=(files)=>{
        setSelectedFiles(files)
    }
    const downloadOfferFiles=(e,id,bool)=>{
        e.preventDefault();
        if(bool){
          const index = offers.findIndex((offer) => offer.id === id);
          if(index !== -1){
              let link = document.createElement('a');
              link.setAttribute('download', null);
              link.style.display = 'none';
              link.target="_blank"
              document.body.appendChild(link);
              const url=process.env.REACT_APP_BACKEND_WEB_SERVICE+"/uploads/offers/"
              offers[index].attachementsDTO.forEach((attachment) => {
                  link.setAttribute('href', url+attachment.path);
                  link.click();
              })
              document.body.removeChild(link);
          }
        }

    }
    return(
        <>
            {
                !offers ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Post Offer" : "Update Offer"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                     formUpdate?
                                        <UseFormUpdate loading={loading} debounceKey={debounceKey} dropZoneOnChange={dropZoneOnChange}
                                                 onSubmit={onSubmitUpdateForm} preloadedValues={formUpdate}/>
                                        :
                                        <UseForm  loading={loading} debounceKey={debounceKey} dropZoneOnChange={dropZoneOnChange}
                                                 onSubmit={onSubmitAddForm}/>
                                }

                            </CModalBody>
                        </CModal>

                        <CRow >
                            <CCol>
                                <CCard>
                                    <CCardBody >
                                        <CCardTitle>
                                            Create New Offer
                                            <CButton style={{float: "right"}} color="info"
                                                     onClick={() =>setVisible(true)}>
                                                <AddBoxIcon/>
                                            </CButton>

                                        </CCardTitle>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <br/>
                        <CRow >
                            {
                                offers.length > 0 ?
                                offers.map((offer,index) =>{
                                    return(
                                            <CCol sm={4} key={index} >
                                                <CCard style={{height: '400px'}}>
                                                    <CCardBody style={{overflow: 'auto'}}>
                                                        <CCardTitle>
                                                            {offer.title}
                                                        </CCardTitle>
                                                        <hr/>
                                                        <CCardText style={{display:"flex"}}>
                                                            {offer.description}
                                                        </CCardText>
                                                    </CCardBody>

                                                    <CCardFooter>
                                                        <small className="text-medium-emphasis">Posted By {offer.createdByDTO.firstName+" "+offer.createdByDTO.lastName} at &nbsp;
                                                            {new Date(offer.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</small>
                                                       <br/><br/>
                                                        <small>({offer.attachementsDTO.length} files attached) &nbsp;</small>

                                                            <CIcon icon={icon.cilCloudDownload}  width={20} onClick={(e)=>downloadOfferFiles(e,offer.id,offer.attachementsDTO.length>0)} title={"Download Files"}/>
                                                            <CIcon icon={icon.cilPen}  width={18} style={{marginLeft:"10px"}} onClick={()=>showUpdateForm(offer.id)} title={"Edit Offer"}/>
                                                        {
                                                            user.roleDTO.title==="ADMIN" || user.roleDTO.title==="TEACHER"?
                                                                <Popconfirm title="Are you sure？" okText="Yes"
                                                                            onConfirm={() => deleteOfferHandler(offer.id)}
                                                                            cancelText="No">
                                                                    <CIcon icon={icon.cilTrash} width={18}
                                                                           style={{marginLeft: "10px"}}
                                                                           title={"Remove Offer"}/>
                                                                </Popconfirm>
                                                            :
                                                                null
                                                        }


                                                    </CCardFooter>
                                                </CCard>
                                            </CCol>
                                    )
                                })
                                    :
                                    <h2 style={{marginLeft:"40%"}}>No offers available <svg width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                                                    className="c-icon c-icon-custom-size text-danger mb-2" role="img">
                                        <path fill="var(--ci-primary-color, currentColor)"
                                              d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z"
                                              className="ci-primary"></path>
                                    </svg></h2>
                            }

                        </CRow>
                    </>
            }
        </>
    );

}

export default Offers;
