import {lazy} from 'react';

const Home =lazy(() => import('../../views/FrontOffice/Home/Home'));
const Test =lazy(() => import('../../views/FrontOffice/Home/test'));

const routes = [
    { path: '/home',exact: true, component: Home },
    { path: '/home/test',exact: true, component: Test },
];

export default routes;
