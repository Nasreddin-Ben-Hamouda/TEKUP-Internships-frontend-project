import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Admin/Dashboard/Dashboard'));
const Profile =lazy(() => import('../../../views/BackOffices/Admin/Profile/Profile'));
const Offers =lazy(() => import('../../../views/BackOffices/Admin/Offers/Offers'));
const Sections =lazy(() => import('../../../views/BackOffices/Admin/Sections/Sections'));
const Classes =lazy(() => import('../../../views/BackOffices/Admin/Classes/Classes'));
const Users =lazy(() => import('../../../views/BackOffices/Admin/Users/Users'));
const Students =lazy(() => import('../../../views/BackOffices/Admin/Students/Students'));

const routes = [
    { path: '/administrator',exact: true, name: 'Administrator' },
    { path: '/administrator/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/administrator/profile',exact: true, name: 'Profile', component: Profile },
    { path: '/administrator/offers',exact: true, name: 'Offers', component: Offers },
    { path: '/administrator/sections',exact: true, name: 'Sections', component: Sections },
    { path: '/administrator/classes',exact: true, name: 'Classes', component: Classes },
    { path: '/administrator/users',exact: true, name: 'Users', component: Users },
    { path: '/administrator/students',exact: true, name: 'Students', component: Students },
];

export default routes;
