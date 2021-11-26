import React, { Suspense} from 'react'
import {Route, Switch} from "react-router-dom";
import { Spin} from 'antd';
import Layout from '../../hoc/Layouts/FrontOffice/Layout'
import routes from '../../routes/FrontOffice/routes'
import '../../styles/FrontOffice/bootstrap.css';
import '../../styles/FrontOffice/style.css';
import '../../assets/FrontOffice/fonts/font-awesome/css/font-awesome.css';
import '../../styles/FrontOffice/nivo-lightbox/nivo-lightbox.css';
import '../../styles/FrontOffice/nivo-lightbox/default.css';



const loading = (
    <Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>
)

const TheContent = (props) => {
    return (
            <Layout>
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
