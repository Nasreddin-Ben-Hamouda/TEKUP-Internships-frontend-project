import React from "react";
import Features from "../../../components/FrontOffice/features"
import About from "../../../components/FrontOffice/about"
import JsonData from "../../../data/FrontOffice/data.json"
const Home = (props) => {
    return (
        <React.Fragment>
            <Features data={JsonData.Features} />
            <About data={JsonData.About} />
        </React.Fragment>
    );
};
export default Home;
