import React, { useEffect, useState} from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardGroup,
    CWidgetProgressIcon, CSpinner,

} from '@coreui/react'
import {
    CChart,

} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import axios from "../../../../axios/web-service";
import * as icon from "@coreui/icons";

const Dashboard = () => {
    const [statistics, setStatistics] = useState(null);
    useEffect(() => {
        getStatistics()
    }, []);

    const getStatistics = () => {
        axios.get('/statistics/admin')
            .then((response) => {
                setStatistics(response.data);
            })
    }
    return (
        <>
            {
                statistics ?
                    <>
                        <CCardGroup className="mb-4">
                            <CWidgetProgressIcon
                                header={statistics.adminsNumber.toString()}
                                text="Administrators"
                                color="gradient-success"
                                value={statistics.adminsNumber*100/100}
                            >
                                <CIcon icon={icon.cilPeople} width={40} height={40} />

                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.teachersNumber.toString()}
                                text="Teachers"
                                color="gradient-success"
                                value={statistics.teachersNumber*100/100}
                            >
                                <CIcon icon={icon.cilUserFemale} width={40} height={40} />
                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.studentsNumber.toString()}
                                text="Students"
                                color="gradient-success"
                                value={statistics.studentsNumber*100/100}
                            >
                                <CIcon icon={icon.cilUser} width={40} height={40} />

                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.internshipsNumber.toString()}
                                text="Internships"
                                color="gradient-success"
                                value={statistics.internshipsNumber*100/100}
                            >
                                <CIcon icon={icon.cilTask} width={40} height={40} />

                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.defensesNumber.toString()}
                                text="Defenses"
                                color="gradient-success"
                                value={statistics.defensesNumber*100/100}
                            >
                                <CIcon icon={icon.cilNotes} width={40} height={40} />
                            </CWidgetProgressIcon>


                        </CCardGroup>

                        <CCard>
                            <CCardHeader>
                                Internships and Defenses
                            </CCardHeader>
                            <CCardBody>
                                <CChart
                                    type="line"
                                    data={{
                                        labels: ["2017","2018","2019", "2020", "2021"],
                                        datasets: [
                                            {
                                                label: "Internships",
                                                backgroundColor: "rgba(220, 220, 220, 0.2)",
                                                borderColor: "rgba(220, 220, 220, 1)",
                                                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                                pointBorderColor: "#fff",
                                                data:
                                                    [
                                                        statistics.internships2017,
                                                        statistics.internships2018,
                                                        statistics.internships2019,
                                                        statistics.internships2020,
                                                        statistics.internships2021
                                                    ]
                                            },
                                            {
                                                label: "Defenses",
                                                backgroundColor: "rgba(151, 187, 205, 0.2)",
                                                borderColor: "rgba(151, 187, 205, 1)",
                                                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                                                pointBorderColor: "#fff",
                                                data:
                                                    [
                                                        statistics.defenses2017,
                                                        statistics.defenses2018,
                                                        statistics.defenses2019,
                                                        statistics.defenses2020,
                                                        statistics.defenses2021
                                                    ]
                                            },
                                        ],
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </>

                    :
                    <CSpinner color="info" style={{marginLeft: "45%", marginTop: "15%"}}/>
            }
        </>
    )
}

export default Dashboard
