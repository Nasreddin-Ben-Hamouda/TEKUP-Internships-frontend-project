import React, { lazy, Suspense} from "react";
import { Spin} from 'antd';
import {Route, Switch} from "react-router-dom";
const FrontOfficeContent=lazy(() => import('./components/FrontOffice/TheContent'))

function App() {
  return (
      <Suspense fallback={<Spin size="large" style={{marginLeft: "50%", marginTop: "10%"}}/>}>
        <Switch>
          <Route path="/" render={props => <FrontOfficeContent {...props}/>}/>
        </Switch>
      </Suspense>
  );
}

export default App;
