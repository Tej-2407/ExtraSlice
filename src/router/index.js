import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views- Amenities
const Amenities = () => import('@/views/Amenities/Amenities')

//Views - Properties
const Properties = () => import('@/views/Properties/Properties')

//Views - Contracts
const Contracts = () => import('@/views/Contracts/Contracts')
const ContractLength = () => import('@/views/Contracts/ContractLength')

//Views - Additional Options
const AdditionalOptions = () => import('@/views/AdditionalOptions/AdditionalOptions')

// Views - Pages
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },

        {
          path: 'properties',
          name: 'Properties',
          component: Properties
        },
        {
          path: '/contracts',
          name: 'Contracts',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
    
            {
              path: 'contracts',
              name: 'Contracts',
              component: Contracts
            },
            {
              path: 'contractLength',
              name: 'ContractLength',
              component: ContractLength
            }
          ]
        },
        {
          path: 'amenities',
          name: 'Amenities',
          component: Amenities
        },
        {
          path: 'additionalOptions',
          name: 'Additional Options',
          component: AdditionalOptions
        },       
        {
          path: 'users',
          meta: {
            label: 'Users'
          },
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Users',
              component: Users
            },
            {
              path: ':id',
              meta: {
                label: 'User Details'
              },
              name: 'User',
              component: User
            }
          ]
        },

      ]
    },
    {
      path: '/pages',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [

        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

