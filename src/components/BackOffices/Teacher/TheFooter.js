import React  from 'react'
import { CFooter } from '@coreui/react'
//import {Link} from "react-router-dom"
const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
          <a href="/">TEKUP Internships</a>
        <span className="ml-1">&copy; {new Date().getFullYear()} creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
          <a href="https://www.linkedin.com/in/nasr-eddin-ben-hamouda-998107172/" target="_blank" rel="noreferrer" >Nasr Eddine Ben Hamouda</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
