import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Teacher/Dashboard/Dashboard'));
const Profile =lazy(() => import('../../../views/BackOffices/Admin/Profile/Profile'));
const Offers =lazy(() => import('../../../views/BackOffices/Admin/Offers/Offers'));

const routes = [
    { path: '/teacher',exact: true, name: 'Teacher' },
    { path: '/teacher/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/teacher/profile',exact: true, name: 'Profile', component: Profile },
    { path: '/teacher/offers',exact: true, name: 'Offers', component: Offers },

];

export default routes;
