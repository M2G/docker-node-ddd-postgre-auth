import postUsecase from  '../../../../src/app/authenticate/post';

describe('App -> User -> Post', () => {
  let useCase: { authenticate: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        authenticate: (data: any) => data
      }

      useCase = postUsecase({
        usersRepository: MockRepository
      })
    })

    it('test', async () => {
      const body = {
        email: "test@hotmail.fr",
        username: 'test',
        password: 'test',
      }

      const lists = await useCase.authenticate({ ...body })
      const { email } = lists;
      expect(email).toEqual(body.email)
    })
  })

  describe('Fail path', () => {
    const body = {
      email: "test@hotmail.fr",
      username: 'test',
      password: 'test',
    }

    beforeEach(() => {
      const MockRepository = {
        authenticate: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        usersRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.authenticate({ body })
      } catch (e) {
        error = e.message
      }
      expect(error).toEqual('Error')
    })
  })

})
