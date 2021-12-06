
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
      to: `/administrator/users`,
      icon:'cilPeople' ,
    },

  {
    _tag: 'CSidebarNavItem',
    name: 'Panels',
    to: `/administrator/panels`,
    icon:'cilWc' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Offers',
    to: `/administrator/offers`,
    icon:'cilMap' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Classes',
    to: `/administrator/classes`,
    icon:'cilListRich' ,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sections',
    to: `/administrator/sections`,
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
        to: `/administrator/internships/requests`,
        icon:'cilPaperPlane' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Confirmed Internships',
        to: `/administrator/internships/confirmed`,
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
        to: `/administrator/defenses`,
        icon:'cilFile' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Auto Scheduling',
        to: `/administrator/defenses/auto`,
        icon:'cilApplicationsSettings' ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Calendar',
        to: `/administrator/defenses/calendar`,
        icon:'cilCalendar',
      },
    ],
  },


]


