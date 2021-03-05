import { expect } from 'chai';
import sinon from 'sinon';

import { isAuth } from '../middleware/auth/authentication.js';

it('Should throw error if token not exist.', function () {
    const req = {
        cookies: {
    
        }
    }

    req.cookies["auth-token"] = null;

    expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated!");

})