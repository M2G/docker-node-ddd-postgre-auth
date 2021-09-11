/*eslint-disable*/
export default ({ config }: any) => {
  const defaultResponse = (success = true) => ({
    success,
    version: config.version,
    date: new Date()
  })

  const Success = (data: any) =>
    ({ ...defaultResponse(true), data });

  const Fail = (data: any) =>
    ({ ...defaultResponse(false), error: data });

  return {
    Success,
    Fail
  }
}
