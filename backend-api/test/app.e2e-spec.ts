import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('/ (GET USERS)', () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .expect(200);
  });

  it('/ (GET USERS with limit)', () => {
    return request(app.getHttpServer())
      .get('/api/users')
      .query({
        limit: 10
      }).expect(200);
  });

  it('/ (DELTE USERS)', () => {
    return request(app.getHttpServer())
      .delete(`/api/users/${1234}`)
      .expect(204);
  });


  afterAll(async () => {
    await app.close();
  });
});
