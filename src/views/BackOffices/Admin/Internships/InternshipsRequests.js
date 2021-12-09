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
//import UseForm from "./UseForm";
//import UseFormUpdate from "./UseFormUpdate";
import axios from "../../../../axios/web-service";
import cogoToast from "cogo-toast";
import { Popconfirm } from 'antd';
import "antd/dist/antd.css";
import InternshipDetails from "./InternshipDetails"
const InternshipsRequests=(props)=> {


    const [internships, setInternships] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [internshipDetail, setInternshipDetail] = useState(null);
    const [visible, setVisible] = useState(false);
    const [internshipDetailVisible, setInternshipDetailVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getAllInternships()
    }, [])
    const getAllInternships = () => {
        axios.get('/internship/list')
            .then((response) => {
                const internships = response.data.filter((item) => item.confirmation === 0);
                setInternships(internships);
            })
    }

    const modalCloseHandle = () => {
        setFormUpdate(null)
        setVisible(false);
    }
    const modalDetailCloseHandle = () => {
        setInternshipDetail(null)
        setInternshipDetailVisible(false);
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

        {key: 'type', label: "Type"},
        {key: 'universityFramer', label: "Tekup framer"},
        {key: 'duration', label: "Duration"},
        {key: 'startDate', label: "Start Date"},
        {key: 'endDate', label: "End Date"},
        {key: 'createdAt'},
        {
            key: 'show_details',
            label: 'Actions',
            _style: {width: '1%'},
            sorter: false,
            filter: false
        }
    ]


    const onSubmitAddForm = (data, e) => {
        // setLoading(true)
        // data = {
        //     firstName:data.firstName,
        //     lastName:data.lastName,
        //     email:data.email,
        //     password:data.password,
        //     phone:data.phone,
        //     cinNumber:data.cinNumber,
        //     roleDTO:{id:data.role},
        // }
        // axios.post('/user/create', data)
        //     .then(() => {
        //         setLoading(false)
        //         cogoToast.success("User created successfully", {position: "top-right"})
        //         modalCloseHandle()
        //         e.target.reset()
        //         getAllUsers()
        //         setDetails([])
        //     })
        //     .catch((error) => {
        //         setLoading(false)
        //     });
    };

    const onSubmitUpdateForm = (data, e) => {
        // setLoading(true)
        // data = {
        //     id:data.id,
        //     firstName:data.firstName,
        //     lastName:data.lastName,
        //     email:data.email,
        //     password:data.password!==""?data.password:null,
        //     phone:data.phone,
        //     cinNumber:data.cinNumber,
        //     roleDTO:data.role?{id:data.role}:null,
        // }
        // console.log(data)
        // axios.put(`/user/${data.id}/update`, data)
        //     .then(() => {
        //         setLoading(false)
        //         cogoToast.success("User updated successfully", {position: "top-right"})
        //         modalCloseHandle()
        //         e.target.reset()
        //         getAllUsers()
        //         setDetails([])
        //     })
        //     .catch((error) => {
        //         setLoading(false)
        //     });
    };

    const showUpdateForm = (id) => {
        // const index = users.findIndex((user) => user.id === id);
        // const user={
        //     ...users[index],
        //     role:users[index].roleDTO!==null?users[index].roleDTO.id:null,
        //     password:null
        // }
        // setFormUpdate(user)
        // setVisible(true)
    }
    const showInternshipDetails = (id) => {
        const index = internships.findIndex((intern) => intern.id === id);
        const internship = {
            ...internships[index]
        }
        setInternshipDetail(internship)
        setInternshipDetailVisible(true)
    }

    const deleteCustomerHandler = (id) => {
        // axios.delete(`/user/${id}/delete`)
        //     .then(() => {
        //         cogoToast.success("User deleted successfully", {position: "top-right"})
        //         getAllUsers()
        //         setDetails([])
        //     })
    }
    const getType = (nbr) => {
        //[1=>First,2=>Second,3=>PFE,4=>Other]
        switch (nbr) {
            case 1:
                return "1st year internship";
            case 2:
                return "2nd year internship";
            case 3:
                return "Final courses internship"
            default:
                return "other"
        }
    }


    return (


        <>
            {
                !internships ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader
                                closeButton> {!formUpdate ? "Add Internship" : "Update Internship"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {/*{*/}
                                {/*    roles?*/}
                                {/*        formUpdate ?*/}
                                {/*            <UseFormUpdate loading={loading}  roles={roles} preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/> :*/}
                                {/*            <UseForm loading={loading} roles={roles} onSubmit={onSubmitAddForm}/>*/}
                                {/*        :*/}
                                {/*        <CSpinner color="info" style={{marginLeft: "45%"}}/>*/}
                                {/*}*/}
                            </CModalBody>
                        </CModal>
                        <CModal show={internshipDetailVisible} onClose={modalDetailCloseHandle}>
                            <CModalHeader closeButton>Internship Details</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    internshipDetail ?
                                        <InternshipDetails internship={internshipDetail}/>
                                        :
                                        <CSpinner color="info" style={{marginLeft: "45%"}}/>
                                }

                            </CModalBody>
                        </CModal>
                        <CCard>
                            <CCardHeader>
                                <CButton style={{float: "right"}} color="info"
                                         onClick={() => setVisible(true)}>
                                    <AddBoxIcon/>
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={internships}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'createdAt':
                                            (item) => (
                                                <td>
                                                    {new Date(item.createdAt).toLocaleDateString('en-us', {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric"
                                                    })}
                                                </td>
                                            ),
                                        'startDate':
                                            (item) => (
                                                <td>
                                                    {new Date(item.startDate).toLocaleDateString('en-us', {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric"
                                                    })}
                                                </td>
                                            ),
                                        'endDate':
                                            (item) => (
                                                <td>
                                                    {new Date(item.endDate).toLocaleDateString('en-us', {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric"
                                                    })}
                                                </td>
                                            ),
                                        'type':
                                            (item) => (
                                                <td>
                                                    {getType(item.type)}
                                                </td>
                                            ),
                                        'duration':
                                            (item) => (
                                                <td>
                                                    {item.duration + " Weeks"}
                                                </td>
                                            ),
                                        'universityFramer':
                                            (item) => (
                                                <td>
                                                    {item.universityFramerDTO.firstName + " " + item.universityFramerDTO.lastName}
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
                                                            <CButton size="sm" style={{width: "10%"}} color="success"
                                                                     onClick={() => showInternshipDetails(item.id)}>
                                                                More Details
                                                            </CButton>
                                                            <CButton size="sm" style={{width: "6%"}} color="info" className="ml-1"
                                                                     onClick={() => showUpdateForm(item.id)}>
                                                                Edit
                                                            </CButton>
                                                            <Popconfirm
                                                                title="Are you sure？"
                                                                okText="Yes"
                                                                onConfirm={() => deleteCustomerHandler(item.id)}
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

export default InternshipsRequests;
