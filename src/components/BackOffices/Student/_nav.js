
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
    to: `/student/offers`,
    icon:'cilMap' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Internships',
    to: `/student/internships`,
    icon:'cilLayers' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Defenses',
    to: `/student/defenses`,
    icon:'cilLaptop' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar',
    to: `/student/defenses/calendar`,
    icon:'cilCalendar' ,
  },

]


