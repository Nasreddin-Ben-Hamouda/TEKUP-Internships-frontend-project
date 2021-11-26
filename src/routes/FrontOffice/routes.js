import {lazy} from 'react';

const Home =lazy(() => import('../../views/FrontOffice/Home/Home'));

const routes = [
    { path: '/',exact: true, name: 'home', component: Home },
];

export default routes;
