import React, {Suspense} from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import TheLayout from "../../../hoc/Layouts/BackOffices/Student/Layout"
// routes config
import routes from '../../../routes/BackOffices/Student/routes'
import { icons } from '../../../assets/BackOffices/icons'
import '../../../styles/BackOffices/style.scss';
import {useSelector} from "react-redux";
React.icons = icons

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
    let user = useSelector(state => state.user.user);
    if(user.roleDTO.title!=="STUDENT"){
        window.location.replace('/')
    }

  return (
    <TheLayout {...props}>
        <main className="c-main">
          <CContainer fluid>
              <Suspense fallback={loading}>

                  <Switch>
                      {
                          routes.map((route, idx) => {
                          return route.component && (
                              <Route
                                  key={idx}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={props => (
                                      <CFade>
                                          <route.component {...props} />
                                      </CFade>
                                  )} />
                          )
                         })

                      }
                      <Redirect from={props.match.path} to={props.match.path+"/dashboard"} />
                  </Switch>
              </Suspense>
          </CContainer>
        </main>
    </TheLayout>
  )
}

export default React.memo(TheContent)
