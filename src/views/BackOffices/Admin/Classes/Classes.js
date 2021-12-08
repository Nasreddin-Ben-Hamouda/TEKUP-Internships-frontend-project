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
const Classes = (props) => {

    const [classes, setClasses] = useState(null);
    const [sections, setSections] = useState(null);
    const [details, setDetails] = useState([]);
    const [formUpdate, setFormUpdate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [ loading,setLoading]=useState(false);

    useEffect(() => {
        getAllClasses();
        getAllSections();
    }, []);
    const getAllClasses = () => {
        axios.get('/class/list' )
            .then((response) => {
                setClasses(response.data);
            })
    }
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

        {key: 'name', label: "Name", _style: {width: '20%'}},
        {key: 'section', label: "Section", _style: {width: '20%'}},
        {key: 'level', label: "Level", _style: {width: '20%'}},
        {key: 'nbrStudents', label: "Number of students", _style: {width: '20%'}},
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
            name:data.name,
            level:data.level,
            sectionDTO:{id:data.section}
        }
        axios.post('/class/create', data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Class added successfully", {position: "top-right"})
                modalCloseHandle()
                e.target.reset()
                getAllClasses()
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
            name:data.name,
            level:data.level,
            sectionDTO:{id:data.section}
        }
        axios.put(`/class/${data.id}/update`, data)
            .then(() => {
                setLoading(false)
                cogoToast.success("Class updated successfully", {position: "top-right"})
                modalCloseHandle()
                getAllClasses()
                setDetails([])

            })
            .catch((error) => {
                setLoading(false)
            });
    };

    const showUpdateForm = (id) => {
        const index = classes.findIndex((classe) => classe.id === id);
        const classe={
            ...classes[index],
            section:classes[index].sectionDTO!==null?classes[index].sectionDTO.id:null
        }
        setFormUpdate(classe)
        setVisible(true)
    }

    const deleteCustomerHandler = (id) => {

        axios.delete(`/class/${id}/delete`)
            .then(() => {
                cogoToast.success("Class deleted successfully", {position: "top-right"})
                getAllClasses()
                setDetails([])
            })
    }

    return (


        <>
            {
                !classes ? <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
                    :
                    <>
                        <CModal show={visible} onClose={modalCloseHandle}>
                            <CModalHeader closeButton> {!formUpdate ? "Add Class" : "Update Class"}</CModalHeader>
                            <br/>
                            <CModalBody>
                                {
                                    sections?
                                        formUpdate ?
                                            <UseFormUpdate sections={sections} loading={loading} preloadedValues={formUpdate} onSubmit={onSubmitUpdateForm}/> :
                                            <UseForm sections={sections} loading={loading} onSubmit={onSubmitAddForm}/>
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
                                    items={classes}
                                    fields={fields}
                                    columnFilter
                                    tableFilter
                                    itemsPerPageSelect
                                    itemsPerPage={5}
                                    hover
                                    sorter
                                    pagination
                                    scopedSlots={{
                                        'section':
                                            (item) => (
                                                <td>
                                                    {item.sectionDTO.title}
                                                </td>
                                            ),
                                        'nbrStudents':
                                            (item) => (
                                                <td>
                                                    {item.usersDTO.length}
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

export default Classes ;
