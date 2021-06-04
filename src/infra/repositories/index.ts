/*eslint-disable*/
import Product from './product';
import Country from './country'
import City from './city'
import Store from './store'
import StatusName from './status_name'
import Users from './users'
import Sale from './sale'
import OrderStatus from './order_status'

export default ({ database }: any) => {

 const { models } = database;

  // console.log('database database database database', models)

  const {
    product,
    country,
    city,
    store,
    users,
    status_name,
    sale,
    order_status,
   } = models;

  const productModel: any = product;
  const countryModel: any = country;
  const cityModel: any = city;
  const storeModel: any = store;
  const usersModel: any = users;
  const statusNameModel: any = status_name;
  const saleModel: any = sale;
  const orderStatusModel: any = order_status;

  return {
    productRepository: Product({ model: productModel }),
    countryRepository: Country({ model: countryModel }),
    cityRepository: City({ model: cityModel }),
    storeRepository: Store({ model: storeModel }),
    usersRepository: Users({ model: usersModel }),
    statusNameRepository: StatusName({ model: statusNameModel }),
    saleRepository: Sale({ model: saleModel }),
    orderStatusRepository: OrderStatus({ model: orderStatusModel }),
  };
};
