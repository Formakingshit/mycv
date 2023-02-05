import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'test@test.com',
          password: 'password',
        });
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'password',
          },
        ]);
      },
      // update: () => {},
      // remove: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('returns a list of users with the given email', async () => {
      const users = await controller.findAllUsers('test@test.com');
      expect(users.length).toEqual(1);
      expect(users[0].email).toEqual('test@test.com');
    });
  });

  describe('findUser', () => {
    it('returns a single user with the given id', async () => {
      const user = await controller.findUser('1');
      expect(user).toBeDefined();
    });

    it('throws an error if user with given id is not found', async () => {
      fakeUsersService.findOne = () => null;

      await expect(controller.findUser('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('updates session object and returns user', async () => {
      const session = { userId: -10 };
      const user = await controller.signin(
        {
          email: 'test@test.com',
          password: 'password',
        },
        session,
      );

      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
      expect(session.userId).toEqual(1);
    });
  });
});
