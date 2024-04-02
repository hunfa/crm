// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {
  UsersRouteObj,
  createDepartmentalTicketsRouteObj,
  createTicketsRouteObj,
  homeRouteObj,
  viewBusinessesRouteObj,
  accountsRouteObj,
  viewDepartmentalTicketsRouteObj,
  viewTicketsRouteObj,
  analyticsRouteObj
} from './routes'

const adminNavigation = (): VerticalNavItemsType => {
  return [
    homeRouteObj,
    createTicketsRouteObj,
    viewTicketsRouteObj,
    createDepartmentalTicketsRouteObj,
    viewDepartmentalTicketsRouteObj,
    UsersRouteObj,
    viewBusinessesRouteObj,
    accountsRouteObj,
    analyticsRouteObj
  ]
}

export default adminNavigation
