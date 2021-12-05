import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Teacher/Dashboard/Dashboard'));
const Profile =lazy(() => import('../../../views/BackOffices/Admin/Profile/Profile'));

const routes = [
    { path: '/teacher',exact: true, name: 'Teacher' },
    { path: '/teacher/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/teacher/profile',exact: true, name: 'Profile', component: Profile },

];

export default routes;
