import { Report } from '../../entity/Report'

const listReports = async (_: void, __: void) => {
  const reports = await Report.find({
    relations: ['user', 'symptoms', 'location', 'request', 'request.replies'],
  })

  return {
    code: 200,
    success: true,
    message: 'Successfully retrieved reports',
    reports,
  }
}

export default listReports
