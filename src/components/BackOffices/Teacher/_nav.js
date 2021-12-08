
export const _nav=
[
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: `/teacher/dashboard`,
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

  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Panels',
  //   to: `/teacher/panels`,
  //   icon:'cilWc' ,
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Offers',
    to: `/teacher/offers`,
    icon:'cilMap' ,
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Internships Management',
    icon: 'cilLayers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Internship Requests',
        to: `/teacher/internship/requests`,
        icon:'cilPaperPlane' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Confirmed Internships',
        to: `/teacher/internship/confirmed`,
        icon:'cilCheck' ,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Defenses Management',
    icon: 'cilLaptop',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Defenses',
        to: `/teacher/defenses`,
        icon:'cilFile' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Calendar',
        to: `/teacher/defenses/calendar`,
        icon:'cilCalendar' ,
      },
    ],
  },


]


