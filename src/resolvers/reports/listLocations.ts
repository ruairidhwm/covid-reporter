import { Location } from '../../entity/Location'

const listLocations = async (_: void, __: void) => {
  const locations = await Location.find()

  return {
    code: 200,
    success: true,
    message: 'Successfully retrieved locations',
    locations,
  }
}

export default listLocations
