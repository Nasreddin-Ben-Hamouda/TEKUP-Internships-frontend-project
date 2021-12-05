import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Admin/Dashboard/Dashboard'));
const Profile =lazy(() => import('../../../views/BackOffices/Admin/Profile/Profile'));

const routes = [
    { path: '/administrator',exact: true, name: 'Administrator' },
    { path: '/administrator/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/administrator/profile',exact: true, name: 'Profile', component: Profile },
];

export default routes;
