import { Injectable, Inject, HttpService, CACHE_MANAGER } from '@nestjs/common';
@Injectable()
export class UsersService {
  private namespace = process.env.API_ENDPOINT;
  private DELETED_USERS = 'deleted_users';
  private DEFAULT_PAGE_LIMIT = 20;
  private DEFAULT_PAGE = 1;

  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager,
    private httpService: HttpService,
  ) {}

  /**
   * This method is used to fetch all the active users with give params
   * @Parameters {Params}
   */
  public fetchUsers(params) {
    const page = params.page || this.DEFAULT_PAGE;
    const limit = params.limit || this.DEFAULT_PAGE_LIMIT;
    const headers = this.getBasicHeaders();
    return this.httpService
      .get(`${this.namespace}/data/api/user?limit=${limit}&page=${page}`, {
        headers,
      })
      .toPromise()
      .then(async (response) => {
        const deletedUsers = await this.getDeletedUsers();
        const result = response.data;
        const userList = result.data;
        const activeUsers = userList.filter(
          (user) => !deletedUsers.includes(user.id),
        );
        result.data = activeUsers;
        return result;
      });
  }

  /**
   * This method is used to delete the active user and cahce the user id
   * @Parameters {userId}
   */
  public async deleteUser(userId) {
    const cacheDeletedUsers = await this.getDeletedUsers();
    const deletedUsers = [...cacheDeletedUsers, userId];
    return await this.cacheManager.set(this.DELETED_USERS, deletedUsers);
  }

  /**
   * This method is used to get all the deleted users from the cache
   */
  private getDeletedUsers(): Promise<Array<string>> {
    return this.cacheManager
      .get(this.DELETED_USERS)
      .then((data: Array<string>) => {
        return data ? data : [];
      });
  }

  /**
   * This method is used to get basic header
   */
  private getBasicHeaders() {
    return {
      'Content-Type': 'application/json',
      'app-id': process.env.APP_ID,
    };
  }
}
