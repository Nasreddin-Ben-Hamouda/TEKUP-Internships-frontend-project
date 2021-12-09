import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import {Paper,Grid,Avatar,Chip,Accordion,AccordionDetails,AccordionSummary} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import * as icon from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const InternshipDetails=(props)=> {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

        return (
            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{flexShrink: 0}}>
                            Subject Description
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={{color: 'text.secondary'}}>
                            {props.internship.subjectDescription}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{width: '33%', flexShrink: 0}}>Students</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1}>
                            {
                                props.internship.studentsDTO.map((student) => {
                                    return (
                                        <>
                                            <Stack direction="row">
                                                <Chip
                                                    avatar={<Avatar
                                                        style={{color: "#3c4b64"}}>{student.firstName.slice(0, 1)}</Avatar>}
                                                    label={student.firstName + " " + student.lastName + " " + student.classeDTO.name}
                                                    style={{color: "#3c4b64"}}
                                                    variant="outlined"
                                                />
                                            </Stack>
                                        </>
                                    )
                                })
                            }
                        </Stack>


                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{width: '33%', flexShrink: 0}}>
                            Company Details
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1}>
                            <Stack direction="row">
                                <Chip
                                    label={"Name:" + props.internship.companyDTO.name}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row">
                                <Chip
                                    label={"Domain:" + props.internship.companyDTO.domain}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row">
                                <Chip
                                    label={"Address: " + props.internship.companyDTO.address}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row">
                                <Chip
                                    label={"Web Site: " + props.internship.companyDTO.website}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"

                                />
                            </Stack>
                        </Stack>


                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel5bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{flexShrink: 0}}>Company Framer Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Stack spacing={1}>
                            <Stack direction="row">
                                <Chip
                                    label={"Name:" + props.internship.companyFramerDTO.name}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row">
                                <Chip
                                    label={"Function:" + props.internship.companyFramerDTO.function}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row">
                                <Chip
                                    label={"Email: " + props.internship.companyFramerDTO.email}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row">
                                <Chip
                                    label={"Phone: " + props.internship.companyFramerDTO.phone}
                                    style={{color: "#3c4b64"}}
                                    variant="outlined"

                                />
                            </Stack>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'}>
                    <AccordionSummary
                    >
                        <Typography sx={{flexShrink: 0}}>Attachments</Typography>
                        <Typography sx={{color: 'text.secondary'}} style={{marginLeft: "20px"}}>
                            <CIcon icon={icon.cilCloudDownload} width={20} title={"Download Files"}/>
                        </Typography>
                    </AccordionSummary>

                </Accordion>
            </div>
        );
    }

export default InternshipDetails;
