import React from "react";
import Navigation from "../../../components/FrontOffice/navigation";
import Header from "../../../components/FrontOffice/header";
import Contact from "../../../components/FrontOffice/contact";
import JsonData from "../../../data/FrontOffice/data.json";
import SmoothScroll from "smooth-scroll";
export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navigation />
            <Header data={JsonData.Header}/>
                {props.children}
            <Contact data={JsonData.Contact} />
        </React.Fragment>
    );
};

export default Layout;
