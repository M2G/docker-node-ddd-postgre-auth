/* eslint-disable */
import toEntity from './transform';

export default ({ model }: any) => {
  const authenticate = (...args: any[]) =>
    model.create(...args).then(({ dataValues }: any) =>
      new toEntity(dataValues));

  return {
    authenticate,
  }
}
