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

const Users = (props) => {
    const [users, setUsers] = useState(null);
    const [roles, setRoles] = useState(null);
    const [classes, setClasses] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllUsers()
        getAllRoles()
        getAllClasses()
    }, []);
    const getAllUsers = () => {

        axios.get('/user/list')
            .then((response) => {
                setUsers(response.data);
            })
    }
    const getAllRoles = () => {
        axios.get('/user/roles' )
            .then((response) => {
                setRoles(response.data);
            })
            .catch((error) => {
                //all errors handled in withErrorHandler hoc component
            })
    }
    const getAllClasses = () => {
        axios.get('/class/list' )
            .then((response) => {
                setClasses(response.data);
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

        {key: 'fullName', label: "Full Name"},
        {key: 'email', label: "Email"},
        {key: 'cinNumber',label: "Cin Number"},
        {key: 'phone'},
        {key: 'role'},
        {key:'class'},
        {key:'createdAt'},
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
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            password:data.password,
            phone:data.phone,
            cinNumber:data.cinNumber,
            roleDTO:{id:data.role},
            classeDTO:data.class==="0"?null:{id:data.class}
        }
        console.log(data)
        axios.post('/user/create', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("User created successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllUsers()
            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const onSubmitUpdateForm = (data,e) => {
        setLoading(true)
        data = {
            id:data.id,
            firstName:data.firstName,
            lastName:data.lastName,
            email:data.email,
            password:data.password!==""?data.password:null,
            phone:data.phone,
            cinNumber:data.cinNumber,
            roleDTO:data.role?{id:data.role}:null,
            classeDTO:data.class==="0"?null:{id:data.class}
        }
        console.log(data)
        axios.put(`/user/${data.id}/update`, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("User updated successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllUsers()
            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const showUpdateForm = (id) => {
        const index = users.findIndex((user) => user.id === id);
        const user={
            ...users[index],
            role:users[index].roleDTO!==null?users[index].roleDTO.id:null,
            class:users[index].classeDTO!==null?users[index].classeDTO.id:"0",
            password:null
        }
        setFormUpdate(user)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {
        axios.delete(`/user/${id}/delete`)
            .then(() => {
                cogoToast.success("User deleted successfully", {position: "top-right"})
                getAllUsers()
                setDetails([])
            })
    }


    return (


        <>
            {
                !users ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add User" : "Update User"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    roles && classes?
                                        formUpdate ?
                                            <UseFormUpdate loading={loading} classes={classes} roles={roles} preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/> :
                                            <UseForm loading={loading} classes={classes} roles={roles} onSubmit={onSubmitAddForm}/>
                                    :
                                        <CSpinner color="info" style={{marginLeft: "45%"}}/>
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
                                    items={users}
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
                                                    {new Date(item.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                                                </td>
                                            ),
                                        'fullName':
                                            (item) => (
                                                <td>
                                                    {item.firstName+" "+item.lastName}
                                                </td>
                                            ),
                                        'role':
                                            (item) => (
                                                <td>
                                                    {item.roleDTO.title}
                                                </td>
                                            ),
                                        'class':
                                            (item) => (
                                                <td>
                                                    {item.classeDTO? item.classeDTO.name:"Not Defined"}
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
                                                            <Popconfirm title="Are you sure？,All records linked with this user(offers,internships...) will be deleted" okText="Yes" onConfirm={() => deleteCustomerHandler(item.id)}
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

export default Users;
