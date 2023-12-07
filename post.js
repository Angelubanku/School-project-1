import supertest from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
import { createRandomPost } from '../helpers/post_helper';
import { createRandomUser } from '../helpers/user_helper';

dotenv.config();

describe('/posts route', () => {
  const request = supertest(process.env.SUPERTEST_BASE_URL);
  const token = process.env.SUPERTEST_USER_TOKEN;
  const debug = process.env.SUPERTEST_DEBUG === '1';

  let userId = null;
  let postId = null;

  before(async () => {
    const createUserResponse = await request
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(createRandomUser());

    userId = createUserResponse.body.id;
  });

  it('GET /posts', async () => {
    const getPostsResponse = await request.get('/posts');
    expect(getPostsResponse.body).to.not.be.empty;
  });

  it('POST /posts', async function () {
    this.retries(4);
    const postData = createRandomPost(userId);

    const createPostResponse = await request
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postData);

    expect(createPostResponse.body).to.include(postData);
    expect(createPostResponse.body).to.have.property('id');
    expect(createPostResponse.status).to.eq(201);

    postId = createPostResponse.body.id;
  });

  it('GET /posts/:id', async () => {
    const getPostResponse = await request.get(`/posts/${postId}?access-token=${token}`);
    expect(getPostResponse.body.id).to.eq(postId);
  });

  it('PUT /posts/:id', async () => {
    const updatedPostData = {
      title: 'This is a post',
      body: 'Supertest is great',
    };

    const updatePostResponse = await request
      .put(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedPostData);

    expect(updatePostResponse.body.title).to.eq(updatedPostData.title);
    expect(updatePostResponse.body.body).to.eq(updatedPostData.body);
  });

  it('PATCH /posts/:id', async () => {
    const updatedPost = {
      title: 'Updated Title',
      body: 'Updated Content',
    };

    const patchPostResponse = await request
      .patch(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedPost);

    expect(patchPostResponse.body.title).to.eq(updatedPost.title);
    expect(patchPostResponse.body.body).to.eq(updatedPost.body);
  });

  it('DELETE /posts/:id', async () => {
    const deletePostResponse = await request
      .delete(`/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deletePostResponse.body).to.be.empty;
    expect(deletePostResponse.status).to.eq(204);
  });

  it('GET /posts/:id (Negative)', async () => {
    const getDeletedPostResponse = await request.get(`/posts/${postId}`);
    expect(getDeletedPostResponse.body.message).to.equal('Resource not found');
  });

  it('DELETE /posts/:id (Negative)', async () => {
    const deleteNonExistingPostResponse = await request.delete(`/posts/${postId}`);
    expect(deleteNonExistingPostResponse.status).to.equal(404);
  });

  after(async () => {
    const deleteUserResponse = await request
      .delete(`users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteUserResponse.body).to.be.empty;
  });
});





