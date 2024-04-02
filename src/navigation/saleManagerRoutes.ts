// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { accountsRouteObj } from './routes'

const saleManagerNavigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      subject: 'home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Create Ticket',
      icon: 'mdi-ticket-confirmation-outline',
      subject: 'create-business-ticket',
      children: [
        { title: 'Local SEO / GMB Optimization', path: '/ticket-create/localSeo' },
        { title: 'Wordpress Development', path: '/ticket-create/wordPress' },
        { title: 'Website SEO', path: '/ticket-create/webSeo' },
        { title: 'Paid Marketing', path: '/ticket-create/paidMarketing' },
        { title: 'Social Media / Customer Reviews Management', path: '/ticket-create/socialMedia' }
      ]
    },
    {
      path: '/view-tickets',
      title: 'View Tickets',
      icon: 'mdi:shield-outline',
      subject: 'view-business-tickets'
    },
    {
      path: '/view-businesses',
      title: 'View Businesses',
      icon: 'mdi:shield-outline',
      subject: 'view-businesses'
    },
    accountsRouteObj
  ]
}

export default saleManagerNavigation
