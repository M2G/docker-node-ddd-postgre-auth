/*eslint-disable*/
/**
  * function for get users.
  */
export default ({ usersRepository }: any) => {
  const all = () =>
     Promise.resolve()
      .then(() =>
        usersRepository.getAll({
          attributes: [
            'id',
            'username',
          ]
        })
      )
      .catch(error => {
        throw new Error(error);
      });

  return {
    all
  }
}
