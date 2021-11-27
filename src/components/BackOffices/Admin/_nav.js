
export const _nav=
[
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: `/administrator/dashboard`,
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
      name: 'Users',
      to: `/administrator`,
      icon:'cilPeople' ,
    },

  {
    _tag: 'CSidebarNavItem',
    name: 'Panels',
    to: `/administrator/test`,
    icon:'cilWc' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Offers',
    to: `/administrator/test`,
    icon:'cilMap' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Classes',
    to: `/administrator`,
    icon:'cilListRich' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sections',
    to: `/administrator`,
    icon:'cilList' ,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Internships Management',
    icon: 'cilLayers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Internship Requests',
        to: `/administrator`,
        icon:'cilPaperPlane' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Confirmed Internships',
        to: `/administrator`,
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
        to: `/administrator`,
        icon:'cilFile' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Auto Plan',
        to: `/administrator`,
        icon:'cilApplicationsSettings' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Calendar',
        to: `/administrator`,
        icon:'cilCalendar' ,
      },
    ],
  },


]


