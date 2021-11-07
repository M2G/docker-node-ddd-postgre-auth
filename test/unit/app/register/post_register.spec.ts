import postUsecase from  '../../../../src/app/register/post';

describe('App -> User -> Post', () => {
  let useCase: { register: any; };

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        register: (data: any) => data
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

      const lists = await useCase.register({ ...body });
      expect(lists.email).toEqual(body.email);
      expect(lists.username).toEqual(body.username);
      expect(lists.password).toEqual(body.password);
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
        register: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        usersRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {

      let error
      try {
        await useCase.register({ body })
      } catch (e) {
        error = e.message
      }
      expect(error).toEqual('Error')
    })
  })

})
