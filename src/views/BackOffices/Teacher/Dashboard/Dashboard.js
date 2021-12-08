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
        axios.get('/statistics/teacher')
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
                                header={statistics.framedInternships.toString()}
                                text="Framed Internships"
                                color="gradient-success"
                                value={statistics.framedInternships*100/100}
                            >
                                <CIcon icon={icon.cilLayers} width={40} height={40} />

                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.reportedDefenses.toString()}
                                text="Reported Internships"
                                color="gradient-success"
                                value={statistics.reportedDefenses*100/100}
                            >
                                <CIcon icon={icon.cilAlbum} width={40} height={40} />
                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.chairedDefenses.toString()}
                                text="Chaired Internships"
                                color="gradient-success"
                                value={statistics.chairedDefenses*100/100}
                            >
                                <CIcon icon={icon.cilLaptop} width={40} height={40} />

                            </CWidgetProgressIcon>
                            <CWidgetProgressIcon
                                header={statistics.createdOffers.toString()}
                                text="Created Offers"
                                color="gradient-success"
                                value={statistics.createdOffers*100/100}
                            >
                                <CIcon icon={icon.cilNotes} width={40} height={40} />
                            </CWidgetProgressIcon>


                        </CCardGroup>

                        <CCard>
                            <CCardHeader>
                                Framed Internships
                            </CCardHeader>
                            <CCardBody>
                                <CChart
                                    type="line"
                                    data={{
                                        labels: ["2017","2018","2019", "2020", "2021"],
                                        datasets: [
                                            {
                                                label: "Framed Internships",
                                                backgroundColor: "rgba(151, 187, 205, 0.2)",
                                                borderColor: "rgba(151, 187, 205, 1)",
                                                pointBackgroundColor: "rgba(151, 187, 205, 1)",
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
