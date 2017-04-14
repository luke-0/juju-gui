/*
 This file is part of the Juju GUI, which lets users view and manage Juju
 environments within a graphical interface (https://launchpad.net/juju-gui).
 Copyright (C) 2016 Canonical Ltd.

 This program is free software: you can redistribute it and/or modify it under
 the terms of the GNU Affero General Public License version 3, as published by
 the Free Software Foundation.

 This program is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
 SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
 General Public License for more details.

 You should have received a copy of the GNU Affero General Public License along
 with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

chai.config.includeStack = true;
chai.config.truncateThreshold = 0;


describe('user auth class', () => {
  it('exists', () => {
    const user = new window.jujugui.User();
    assert.isObject(user);
  });

  const getMockStorage = function() {
    return new function() {
      return {
        store: {},
        setItem: function(name, val) { this.store[name] = val; },
        getItem: function(name) { return this.store[name] || null; }
      };
    };
  };

  describe('identity credentials', () => {
    let storage, user;

    beforeEach(() => {
      storage = getMockStorage();
      user = new window.jujugui.User({localStorage: storage});
    });

    it('can be set', () => {
      user.identity = 'doctor';
      assert.equal(storage.store['discharge-token'], 'doctor');
    });

    it('can be retrieved', () => {
      storage.store['discharge-token'] = 'doctor';
      assert.equal(user.identity, 'doctor');
    });
  });

  describe('controller credentials', () => {
    let storage, user;

    beforeEach(() => {
      storage = getMockStorage();
      user = new window.jujugui.User({sessionStorage: storage});
    });

    beforeEach(() => {
      storage = getMockStorage();
      user = new window.jujugui.User({sessionStorage: storage});
    });

    it('can be set', () => {
      user.controller = {user: 'rose'};
      assert.deepEqual(
        JSON.parse(storage.store.controllerCredentials), {user: 'rose'});
    });

    it('can be retrieved', () => {
      user.controller = {password: 'bad wolf'};
      const creds = user.controller;
      assert.equal(creds.password, 'bad wolf');
    });

    it('normalizes user names', () => {
      user.controller = {user: 'rose'};
      let creds = user.controller;
      assert.equal(creds.user, 'rose@local');
      user.controller = {user: 'doctor@tardis'};
      creds = user.controller;
      assert.equal(creds.user, 'doctor@tardis');
    });

    it('determines if credentials are available', () => {
      let creds = user.controller;
      assert.equal(creds.areAvailable, false);
      user.controller = {macaroons: ['macaroons']};
      creds = user.controller;
      assert.equal(creds.areAvailable, true);
    });

    it('determines if creds are external', () => {
      user.controller = {
        user: 'doctor@tardis',
        password: 'bad wolf',
        external: 'foo'
      };
      const creds = user.controller;
      assert.equal(creds.areExternal, true);
    });
  });

  describe('model credentials', () => {
    let storage, user;

    beforeEach(() => {
      storage = getMockStorage();
      user = new window.jujugui.User({sessionStorage: storage});
    });

    it('can be set', () => {
      user.model = {user: 'rose'};
      assert.deepEqual(
        JSON.parse(storage.store.modelCredentials), {user: 'rose'});
    });

    it('can be retrieved', () => {
      user.model = {password: 'bad wolf'};
      const creds = user.model;
      assert.equal(creds.password, 'bad wolf');
    });

    it('normalizes user names', () => {
      user.model = {user: 'rose'};
      let creds = user.model;
      assert.equal(creds.user, 'rose@local');
      user.model = {user: 'doctor@tardis'};
      creds = user.model;
      assert.equal(creds.user, 'doctor@tardis');
    });

    it('determines if credentials are available', () => {
      let creds = user.model;
      assert.equal(creds.areAvailable, false);
      user.model = {macaroons: ['macaroons']};
      creds = user.model;
      assert.equal(creds.areAvailable, true);
    });

    it('determines if creds are external', () => {
      user.model = {
        user: 'doctor@tardis',
        password: 'bad wolf',
        external: 'foo'
      };
      const creds = user.model;
      assert.equal(creds.areExternal, true);
    });
  });
});
