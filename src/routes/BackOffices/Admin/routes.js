import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Admin/Dashboard/Dashboard'));

const routes = [
    { path: '/administrator',exact: true, name: 'Administrator' },
    { path: '/administrator/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
];

export default routes;
