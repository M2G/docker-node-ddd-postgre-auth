print('===============JAVASCRIPT===============');
print('Count of rows in test collection (User) : ' + db.users.count());
print('Count of rows in test collection (Partner) : ' + db.partners.count());

db.users.insertMany([
  {
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    password: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    username: 'test',
    createDate: '2021-11-21T15:47:44.533Z',
    modifiedAt: '2021-11-22T15:47:44.533Z',
    partner_id: 2,
  },
  {
    firstName: 'test',
    lastName: 'test',
    email: 'test2@gmail.com',
    password: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    username: 'test2',
    createDate: '2021-11-21T15:47:44.533Z',
    modifiedAt: '2021-11-22T15:47:44.533Z',
    partner_id: 1,
  }
]);

db.partners.insertMany([
  {
    partner_id: 1,
    firstName: 'test',
    lastName: 'test',
    email: 'facebook@facebook.com',
    password: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    createDate: '2021-11-21T15:47:44.533Z',
    modifiedAt: '2021-11-22T15:47:44.533Z',
  },
  {
    partner_id: 2,
    firstName: 'test',
    lastName: 'test',
    email: 'brut@brut.media',
    password: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    createDate: '2021-11-21T15:47:44.533Z',
    modifiedAt: '2021-11-22T15:47:44.533Z',
  },
]);


print('===============AFTER JS INSERT==========');
print('Count of rows in test collection (User) : ' + db.users.count());
print('Count of rows in test collection (Partner) : ' + db.partners.count());

alltest = db.users.find();
while (alltest.hasNext()) {
  printjson(alltest.next());
}

alltest2 = db.partners.find();
while (alltest2.hasNext()) {
  printjson(alltest2.next());
}
