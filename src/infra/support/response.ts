/*eslint-disable*/
import { assoc } from 'ramda';

export default ({ config }: any) => {
  const defaultResponse = (success = true) => ({
      success,
      version: config.version,
      date: new Date()
  })

  const Success = (data: any) =>
     assoc(
      'data',
      data,
      defaultResponse(true))


  const Fail = (data: any) =>
     assoc(
      'error',
      data,
      defaultResponse(false))


  return {
    Success,
    Fail
  }
}
