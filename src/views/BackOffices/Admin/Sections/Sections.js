import React, { useEffect, useState} from 'react'
import {
    CButton,
    CCardBody,
    CDataTable,
    CCollapse,
    CCard,CCardHeader,
    CModal,CModalBody,CModalHeader,CSpinner
} from '@coreui/react'
import AddBoxIcon from '@material-ui/icons/AddBox';
import UseForm from "./UseForm";
import UseFormUpdate from "./UseFormUpdate";
import axios from "../../../../axios/web-service";
import cogoToast from "cogo-toast";
import { Popconfirm } from 'antd';
import "antd/dist/antd.css";
const Sections = (props) => {

    const [sections, setSections] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllSections()
    }, []);
    const getAllSections = () => {
        axios.get('/section/list' )
            .then((response) => {
                setSections(response.data);
            })
    }
    const modalCloseHandle = () => {
        setFormUpdate(null)
        setVisible(false);
    }
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails);
    }


    const fields = [

        {key: 'title', label: "Title", _style: {width: '20%'}},
        {key: 'nbrClass', label: "Number of classes", _style: {width: '20%'}},
        {key: 'createdAt', label: "Created At", _style: {width: '20%'}},
        {
            key: 'show_details',
            label: 'Actions',
            _style: {width: '1%'},
            sorter: false,
            filter: false
        }
    ]


    const onSubmitAddForm = (data,e) => {
        setLoading(true)
        data = {
            ...data,
        }
        axios.post('/section/create', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Section added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllSections()
                setDetails([])
            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const onSubmitUpdateForm = (data) => {
        setLoading(true)
        data = {
            id:data.id,
            title:data.title,
        }
        axios.put(`/section/${data.id}/update`, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Section updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllSections()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const showUpdateForm = (id) => {
        const index = sections.findIndex((section) => section.id === id);
        const section={
            ...sections[index],
        }
        setFormUpdate(section)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        axios.delete(`/section/${id}/delete`)
            .then(() => {
                cogoToast.success("Section deleted successfully", {position: "top-right"})
                getAllSections()
                setDetails([])
            })
    }

    return (


        <>
            {
                !sections ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Section" : "Update Section"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    formUpdate ?
                                        <UseFormUpdate loading={loading} preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/> :
                                        <UseForm loading={loading} onSubmit={onSubmitAddForm}/>
                                }
                            </CModalBody>
                        </CModal>
                        <CCard>
                            <CCardHeader>
                                <CButton style={{float: "right"}} color="info"
                                         onClick={() => setVisible(true)}>
                                    <AddBoxIcon />
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={sections}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'nbrClass':
                                            (item) => (
                                                <td>
                                                    {item.classesDTO.length}
                                                </td>
                                            ),
                                        'createdAt':
                                            (item) => (
                                                <td>
                                                    {new Date(item.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                                                </td>
                                            ),
                                        'show_details':
                                            (item, index) => {
                                                return (
                                                    <td className="py-2">
                                                        <CButton
                                                            color="primary"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                            onClick={() => {
                                                                toggleDetails(index)
                                                            }}
                                                        >
                                                            {details.includes(index) ? 'Hide' : 'Show'}
                                                        </CButton>
                                                    </td>
                                                )
                                            },
                                        'details':
                                            (item, index) => {
                                                return (
                                                    <CCollapse show={details.includes(index)}>
                                                        <CCardBody>
                                                            <CButton size="sm" style={{width: "6%"}} color="info"
                                                                     onClick={() => showUpdateForm(item.id)}>
                                                                Edit
                                                            </CButton>
                                                            <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => deleteCustomerHandler(item.id)}
                                                                        cancelText="No">

                                                                <CButton size="sm" color="danger" className="ml-1">
                                                                    Delete
                                                                </CButton>
                                                            </Popconfirm>
                                                        </CCardBody>
                                                    </CCollapse>
                                                )
                                            }
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </>
            }
        </>
    )
}

export default Sections;
