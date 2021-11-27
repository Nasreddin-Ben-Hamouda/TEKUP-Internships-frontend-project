import React, { lazy, Suspense} from "react";
import { Spin} from 'antd';
import {Route, Switch,Redirect} from "react-router-dom";
const FrontOfficeContent=lazy(() => import('./components/FrontOffice/TheContent'))
const AdminContent=lazy(() => import('./components/BackOffices/Admin/TheContent'))

function App() {
    return (
      <Suspense fallback={<Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>}>
        <Switch>

          <Route path="/home"  render={props => <FrontOfficeContent {...props}/>}/>
          <Route path="/administrator"  render={props => <AdminContent {...props}/>}/>
          <Redirect from={"/"} to="/home"/>
        </Switch>
      </Suspense>
  );
}

export default App;
