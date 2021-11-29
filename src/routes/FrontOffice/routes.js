import {lazy} from 'react';

const Home =lazy(() => import('../../views/FrontOffice/Home/Home'));

const routes = [
    { path: '/home',exact: true, component: Home },

];

export default routes;
