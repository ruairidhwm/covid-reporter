import newReport from './newReport'
import addReply from './addReply'
import listLocations from './listLocations'
import listReports from './listReports'

export const Mutation = {
  newReport,
  addReply,
}

export const Query = {
  listLocations,
  listReports,
}

export { newReport }
export { addReply }
export { listLocations }
export { listReports }
