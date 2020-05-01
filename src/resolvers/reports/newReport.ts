import { User } from '../../entity/User'
import { Report } from '../../entity/Report'

const newReport = async (
  _: void,
  {
    location,
    symptoms,
    request,
  }: {
    location: { lat: string; lng: string }
    symptoms: [string]
    request: { message: string }
  },
  { req }: { req: Request },
) => {
  if (!req.userId) {
    return {
      code: 403,
      success: false,
      message: 'Incorrect credentials.',
    }
  }
  const user = await User.findOne(req.userId)

  if (!user) {
    return {
      code: 403,
      success: false,
      message: 'Incorrect credentials',
    }
  }

  const report = Report.create({
    location: {
      lat: location.lat,
      lng: location.lng,
    },
    symptoms: [...symptoms],
    request: {
      message: request.message,
    },
    user,
  }).save()

  return {
    code: 200,
    success: true,
    message: 'Successfully created report',
    report,
  }
}

export default newReport
