import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import userImg from '../../../assets/BackOffices/img/user.png'

const TheHeaderDropdown = (props) => {
  // let img=null;
  // if(props.avatar){
  //   img=process.env.REACT_APP_SUBSCRIPTION_SERVICE+"/storage/avatars/"+props.avatar;
  // }else{
  //   img=userImg;
  // }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar" >
          <CImg
            src={userImg}
            className="c-avatar-img"
            style={{width:"36px",
              height:"36px"}}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon name="cilCheck" className="mfe-2" />
          {props.fullName}
        </CDropdownItem>
        <CDropdownItem to={`/administrator/profile`}>
          <CIcon name="cil-user" className="mfe-2" />
           Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={()=>{console.log("logout here !")}}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
              Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
