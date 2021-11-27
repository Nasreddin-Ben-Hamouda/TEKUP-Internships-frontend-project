import React from 'react'
import {
  TheSidebar,
  TheFooter,
  TheHeader
} from '../../../../components/BackOffices/Student'
const Layout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar  {...props}/>
      <div className="c-wrapper">
        <TheHeader  {...props}/>
        <div className="c-body">
            {props.children}
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default Layout
