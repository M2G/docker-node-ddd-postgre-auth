/*eslint-disable*/
import { assoc } from 'ramda';

export default ({ config }: any) => {
  const defaultResponse = (success = true) => {
    return {
      success,
      version: config.version,
      date: new Date()
    }
  }

  const Success = (data: any) => {
    return assoc(
      'data',
      data,
      defaultResponse(true)
    )
  }

  const Fail = (data: any) => {
    return assoc(
      'error',
      data,
      defaultResponse(false)
    )
  }

  return {
    Success,
    Fail
  }
}
