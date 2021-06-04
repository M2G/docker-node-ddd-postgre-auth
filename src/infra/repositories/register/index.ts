/* eslint-disable */
import toEntity from './transform';

export default ({ model }: any) => {
  const getAll = (...args: any[]) =>
    model.findAll(...args).then((entity: { dataValues: any }[]) =>
      entity?.map((data: { dataValues: any }) => {
        const { dataValues } = data || {};
        return new toEntity(dataValues);
      })
    )

  return {
    getAll,
  }
}
