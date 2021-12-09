import {lazy} from 'react';

const Dashboard =lazy(() => import('../../../views/BackOffices/Teacher/Dashboard/Dashboard'));
const Profile =lazy(() => import('../../../views/BackOffices/Admin/Profile/Profile'));
const Offers =lazy(() => import('../../../views/BackOffices/Admin/Offers/Offers'));
const Students =lazy(() => import('../../../views/BackOffices/Admin/Students/Students'));
const InternshipsConfirmed =lazy(() => import('../../../views/BackOffices/Admin/Internships/InternshipsConfirmed'));
const InternshipsRequests =lazy(() => import('../../../views/BackOffices/Admin/Internships/InternshipsRequests'));

const routes = [
    { path: '/teacher',exact: true, name: 'Teacher' },
    { path: '/teacher/dashboard',exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/teacher/profile',exact: true, name: 'Profile', component: Profile },
    { path: '/teacher/offers',exact: true, name: 'Offers', component: Offers },
    { path: '/teacher/students',exact: true, name: 'Students', component: Students },
    { path: '/teacher/internships/confirmed',exact: true, name: 'Internships / Confirmed', component: InternshipsConfirmed },
    { path: '/teacher/internships/requests',exact: true, name: 'Internships / Requests', component: InternshipsRequests },
];

export default routes;
