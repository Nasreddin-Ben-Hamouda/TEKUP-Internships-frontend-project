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
import * as actions from "../../../store/actions/auth/User";
import {useDispatch} from "react-redux";
import * as icon from "@coreui/icons";

const TheHeaderDropdown = (props) => {
  let img=null;
  if(props.avatar){
    img=process.env.REACT_APP_BACKEND_WEB_SERVICE+"/uploads/users/"+props.avatar;
  }else{
    img=userImg;
  }
  const dispatch = useDispatch();

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar" >
          <CImg
            src={img}
            className="c-avatar-img"
            style={{width:"36px",
              height:"36px"}}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon icon={icon.cilCheck} width={20}  className="mfe-2"/>
          {props.fullName}
        </CDropdownItem>
        <CDropdownItem to={`/student/profile`}>
          <CIcon icon={icon.cilUser} width={20}  className="mfe-2"/>
          Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={()=>{dispatch(actions.logout);window.location.replace("/");}}>
          <CIcon icon={icon.cilLockLocked} width={20}  className="mfe-2"/>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
