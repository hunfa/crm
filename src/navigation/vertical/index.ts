// ** Type import
import { title } from 'process'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      subject: 'home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'mdi:shield-outline'
    },
    {
      title: 'New Ticket',
      icon: 'mdi-ticket-confirmation-outline',
      children: [
        { title: 'Local SEO / GMB Optimization', path: '/ticket/lsf' },
        { title: 'Wordpress Development', path: '/ticket/wd' },
        { title: 'Website SEO', path: '/ticket/ws' },
        { title: 'Paid Marketing', path: '/ticket/pm' },
        { title: 'Social Media / Customer Reviews Management', path: '/ticket/smr' }
      ]
    },
    {
      title: 'Users',
      icon: 'mdi:shield-outline',
      children: [
        { title: 'Create New User', path: '/users/create-user' },
        { title: 'View Users', path: '/users/view-users' }
      ]
    }
  ]
}

export default navigation
