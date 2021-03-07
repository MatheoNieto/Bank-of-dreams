import casual from 'casual'
import request from 'supertest'
import {startServer} from '../../app'

describe('[LOGIN]', () => {
  test('AUTHENTICATION FAILD', async () => {
    const app = await startServer()
    request(app)
    .post('/auth')
    .auth(casual.email, casual.password, {type: 'basic'})
    .send()
      .then((response:any)=>{
        expect(response.statusCode).toBe(401)
      })
  });



});