import React, { Suspense,lazy,useEffect} from 'react'
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import { Spin} from 'antd';
import Layout from '../../hoc/Layouts/FrontOffice/Layout'
import routes from '../../routes/FrontOffice/routes'
import '../../styles/FrontOffice/bootstrap.css';
import '../../assets/FrontOffice/fonts/font-awesome/css/font-awesome.css';
import '../../styles/FrontOffice/nivo-lightbox/nivo-lightbox.css';
import '../../styles/FrontOffice/nivo-lightbox/default.css';
import '../../styles/FrontOffice/style.css';
import cogoToast from 'cogo-toast';
import Scroll from "../../components/FrontOffice/Scroll"
const Login=lazy(()=>import('./Login'))

const loading = (
    <Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>
)
const TheContent = (props) => {
    // function closeOneModal(modalId) {
    //
    //     // get modal
    //     const modal = document.getElementById(modalId);
    //
    //     // change state like in hidden modal
    //     modal.classList.remove('show');
    //     modal.setAttribute('aria-hidden', 'true');
    //     modal.setAttribute('style', 'display: none');
    //
    //     // get modal backdrop
    //     const modalBackdrops = document.getElementsByClassName('modal-backdrop');
    //
    //     // remove opened modal backdrop
    //     document.body.removeChild(modalBackdrops[0]);
    // }
    const user = useSelector(state => state.user.user);
    const redirect = useSelector(state => state.user.redirect);
    useEffect(()=>{
        if(redirect){
            if(user){
                //closeOneModal("exampleModal")
                cogoToast.success("Welcome back !", {position: "top-right"})
                window.location.replace(redirect)
                //dispatch(actions.authFinish())
            }
        }
    })

    return (
            <Layout>
                <Scroll showBelow={250} />
                <div className="modal" tabIndex="-1" id="exampleModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Login/>
                            </div>

                        </div>
                    </div>
                </div>
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
                                                <route.component {...props} />
                                        )} />
                                )
                            })

                        }

                    </Switch>
                </Suspense>
            </Layout>
    )
}

export default React.memo(TheContent)
