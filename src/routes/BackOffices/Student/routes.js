import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Student/Dashboard/Dashboard'));

const routes = [
    { path: '/student',exact: true, name: 'Student' },
    { path: '/student/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
];

export default routes;
