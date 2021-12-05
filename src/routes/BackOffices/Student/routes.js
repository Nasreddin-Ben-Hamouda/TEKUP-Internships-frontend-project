import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Student/Dashboard/Dashboard'));
const Profile =lazy(() => import('../../../views/BackOffices/Admin/Profile/Profile'));

const routes = [
    { path: '/student',exact: true, name: 'Student' },
    { path: '/student/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/student/profile',exact: true, name: 'Profile', component: Profile },

];

export default routes;
