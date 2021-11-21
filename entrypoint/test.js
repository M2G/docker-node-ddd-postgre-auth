print('===============JAVASCRIPT===============');
print('Count of rows in test collection: ' + db.users.count());

db.users.insertMany([
  {
    email: 'test@gmail.com',
    password: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    username: 'test'
  },
  {
    email: 'test2@gmail.com',
    password: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    username: 'test2'
  }
]);

print('===============AFTER JS INSERT==========');
print('Count of rows in test collection (users) : ' + db.users.count());

alltest = db.users.find();
while (alltest.hasNext()) {
  printjson(alltest.next());
}
