import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem, CImg,
} from '@coreui/react'
import * as actions from "../../../store/actions/BackOffices/global"
// sidebar nav config
import {_nav} from './_nav'
import logo from "../../../assets/BackOffices/img/logo.png"
import logoTwo from "../../../assets/BackOffices/img/logo-icon.png"

const TheSidebar = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.global.sidebarShow)
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch(actions.sidebarShow(val))}
    >
      <CSidebarBrand className="d-md-down-none"  to={"/teacher"}>
        <CImg className="c-sidebar-brand-full"
            src={logo}
            alt=""
            width={210}
            height={60}
            style={{marginRight:"3%",marginTop:"-2%"}}
        />
        <CImg className="c-sidebar-brand-minimized"
              src={logoTwo}
              alt=""
              style={{width:"100%",height:"100%"}}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={_nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
