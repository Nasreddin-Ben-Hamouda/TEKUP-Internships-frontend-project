import logo from "../../assets/FrontOffice/img/logo-tekup.png"

const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container' id={"page-top"}>

        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          {/*<Link to={"/administrator"}>*/}
          {/*  <img src={logo} className="img-responsive" alt="" style={{width:"100%",height:"55px",marginTop:"-20px"}} />*/}
          {/*</Link>*/}
          <a href="#page-top">
            <img src={logo} className="" alt="" style={{maxWidth:"150px",marginLeft:"-20px"}} />
          </a>
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right' >
            <li>
              <a href='#features' className='page-scroll'>
                Features
              </a>
            </li>
            <li>
              <a href='#about' className='page-scroll'>
                About
              </a>
            </li>
            <li>
              <a href='#portfolio' className='page-scroll'>
                Internship Offers
              </a>
            </li>
            <li>
              <a href='#contact'  className='page-scroll'>
                Contact
              </a>
            </li>
            <li>
              <button  id="authButton" style={{marginLeft:"20px"}} data-toggle="modal" data-target="#exampleModal">Sign In</button>
            </li>
            {/*<li>*/}
            {/*  <div className="dropdown" >*/}
            {/*    <button className="dropbtn" id="authButton">Dropdown</button>*/}
            {/*    <div className="dropdown-content">*/}
            {/*      /!*<Link to="">Link 1</Link>*!/*/}
            {/*      <ul>*/}
            {/*        <li onClick={()=>console.log("space")}>Link 2</li>*/}
            {/*        <li  onClick={()=>console.log("logout")} >Link 3</li>*/}
            {/*      </ul>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</li>*/}

          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navigation;
