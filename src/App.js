import React, { lazy, Suspense,useEffect} from "react";
import {Route, Switch,Redirect} from "react-router-dom";
import withErrorHandler from "./hoc/WithErrorHandler/withErrorHandler";
import axios from "./axios/web-service";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "./store/actions/auth/User";
import "./styles/FrontOffice/spinner.css"
const FrontOfficeContent=lazy(() => import('./components/FrontOffice/TheContent'))
const AdminContent=lazy(() => import('./components/BackOffices/Admin/TheContent'))
const TeacherContent=lazy(() => import('./components/BackOffices/Teacher/TheContent'))
const StudentContent=lazy(() => import('./components/BackOffices/Student/TheContent'))

function App() {
    let appReady = useSelector(state => state.user.ready);
    let user = useSelector(state => state.user.user)
    let authToken = useSelector(state => state.user.authToken)
    const dispatch = useDispatch();
    let routes=null;
    if(user && authToken){
        if(user.roleDTO.title==="ADMIN") {

            routes = (
                <Switch>
                    <Route path="/home" render={props => <FrontOfficeContent {...props}/>}/>
                    <Route path="/administrator" render={props => <AdminContent {...props}/>}/>
                    <Redirect from={"/"} to="/home"/>
                </Switch>
            );
        }else{
            if(user.roleDTO.title==="TEACHER"){
                routes = (
                    <Switch>
                        <Route path="/home" render={props => <FrontOfficeContent {...props}/>}/>
                        <Route path="/teacher"  render={props => <TeacherContent {...props}/>}/>
                        <Redirect from={"/"} to="/home"/>
                    </Switch>
                );

            }else{
                routes = (
                    <Switch>

                        <Route path="/home" render={props => <FrontOfficeContent {...props}/>}/>
                        <Route path="/student"  render={props => <StudentContent {...props}/>}/>
                        <Redirect from={"/"} to="/home"/>
                    </Switch>
                );

            }

        }
    }else{
        routes = (
            <Switch>
                <Route path="/home" render={props => <FrontOfficeContent {...props}/>}/>
                <Redirect from={"/"} to="/home"/>
            </Switch>
        );
    }
    useEffect(() => {
        dispatch(actions.getAuthenticatedUser())
    }, [dispatch])
    const spinner= (
        <div className="loader">Loading...</div>
    )
    return (
        <Suspense fallback={spinner}>
            {appReady ?
                routes
                :
                spinner
            }
        </Suspense>
  );
}

export default withErrorHandler(App,axios);
