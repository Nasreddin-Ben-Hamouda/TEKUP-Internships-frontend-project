import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Teacher/Dashboard/Dashboard'));

const routes = [
    { path: '/teacher',exact: true, name: 'Teacher' },
    { path: '/teacher/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
];

export default routes;
