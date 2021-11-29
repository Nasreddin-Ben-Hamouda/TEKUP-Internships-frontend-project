
export const _nav=
[
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: `/student/dashboard`,
      icon:'cil-speedometer' ,
      badge: {
        color: 'info',
        text: 'NEW',
      }
    },
    {
      _tag: 'CSidebarNavTitle',
      _children: ['Management']
    },

  {
    _tag: 'CSidebarNavItem',
    name: 'Offers',
    to: `/student`,
    icon:'cilMap' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Internship Requests',
    to: `/student`,
    icon:'cilPaperPlane' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Confirmed Internships',
    to: `/student`,
    icon:'cilCheck' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Defenses',
    to: `/student`,
    icon:'cilLaptop' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar',
    to: `/student`,
    icon:'cilCalendar' ,
  },

]


