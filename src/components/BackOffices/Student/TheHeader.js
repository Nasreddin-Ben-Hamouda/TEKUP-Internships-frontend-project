import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CBreadcrumbRouter,
    CLink, CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../../../routes/BackOffices/Student/routes'
import * as actions from "../../../store/actions/BackOffices/global"

import {
    TheHeaderDropdown,
}  from './index'
import logo from "../../../assets/BackOffices/img/logo.png";

const TheHeader = (props) => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector(state => state.global.sidebarShow);
    //const user=useSelector(state =>state.user.user)
    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch(actions.sidebarShow(val))
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch(actions.sidebarShow(val))
    }

    return (
        <CHeader withSubheader>
            <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={toggleSidebarMobile}
            />
            <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={toggleSidebar}
            />
            <CHeaderBrand className="mx-auto d-lg-none" >
                <CImg
                    src={logo}
                    className=""
                    alt=""
                    width={100}
                    height={30}
                    style={{
                        backgroundColor:"black"
                    }}
                />
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">

                <CHeaderNavItem className="px-3" >
                    <CHeaderNavLink to={"/student/dashboard"}>
                        <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
                        Dashboard
                    </CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem className="px-3">
                    <CHeaderNavLink to={"/student/dashboard"}>
                        <CIcon name="cilMap" customClasses="c-sidebar-nav-icon"/>
                        Offers
                    </CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem className="px-3">
                    <CHeaderNavLink to={"/student/dashboard"}>
                        <CIcon name="cilLayers" customClasses="c-sidebar-nav-icon"/>
                        Internships
                    </CHeaderNavLink>
                </CHeaderNavItem>
                <CHeaderNavItem className="px-3">
                    <CHeaderNavLink to={"/student/dashboard"}>
                        <CIcon name="cilLaptop" customClasses="c-sidebar-nav-icon"/>
                        Defenses
                    </CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>

            <CHeaderNav className="px-3">
                <TheHeaderDropdown  avatar={"fak"} fullName={"admin"} {...props}/>
            </CHeaderNav>

            <CSubheader className="px-3 justify-content-between">
                <CBreadcrumbRouter
                    className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                    routes={routes}
                />
                <div className="d-md-down-none mfe-2 c-subheader-nav">

                    <CLink
                        className="c-subheader-nav-link"
                        aria-current="page"
                        to={"/student/dashboard"}
                    >
                        <CIcon name="cil-graph" alt="Dashboard" href="#"/>&nbsp;Dashboard
                    </CLink>
                    <CLink className="c-subheader-nav-link" aria-current="page"
                           to={"/student/dashboard"} >
                        <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
                    </CLink>
                </div>
            </CSubheader>
        </CHeader>
    )
}

export default TheHeader