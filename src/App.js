import React, { lazy, Suspense} from "react";
import { Spin} from 'antd';
import {Route, Switch,Redirect} from "react-router-dom";
const FrontOfficeContent=lazy(() => import('./components/FrontOffice/TheContent'))
const AdminContent=lazy(() => import('./components/BackOffices/Admin/TheContent'))
const TeacherContent=lazy(() => import('./components/BackOffices/Teacher/TheContent'))
const StudentContent=lazy(() => import('./components/BackOffices/Student/TheContent'))

function App() {
    return (
      <Suspense fallback={<Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>}>
        <Switch>

          <Route path="/home"  render={props => <FrontOfficeContent {...props}/>}/>
          <Route path="/administrator"  render={props => <AdminContent {...props}/>}/>
          <Route path="/teacher"  render={props => <TeacherContent {...props}/>}/>
          <Route path="/student"  render={props => <StudentContent {...props}/>}/>

          <Redirect from={"/"} to="/home"/>
        </Switch>
      </Suspense>
  );
}

export default App;
