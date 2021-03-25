export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'ExtraSlice',
        to: '/dashboard',

      },

      {
        _name: 'CSidebarNavItem',
        name: 'Properties',
        to: '/properties',
        icon: 'cil-property-pie'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Contracts',
        route: '/contracts',
        icon: 'cil-star',
        items: [
          {
            name: 'Contracts',
            to: '/contracts/contracts'
          },
          {
            name: 'ContractLength',
            to: '/contracts/contractLength'
          }, 
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Amenities',
        to: '/amenities',
        icon: 'cil-amenities-pie'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Additional Options',
        to: '/additionalOptions',
        icon: 'cil-additionalOptions-pie'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pages',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Login',
            to: '/pages/login'
          },
          {
            name: 'Register',
            to: '/pages/register'
          },
         
        ]
      },
     
    ]
  }
]