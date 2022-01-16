print('===============JAVASCRIPT===============');
print('Count of rows in test collection (User) : ' + db.users.count());
print('Count of rows in test collection (Partner) : ' + db.partners.count());

db.users.insertMany([
  {
    first_name: 'Smith',
    last_name: 'Jackson',
    email: 'smith.jackson@university.com',
    password: '$2a$10$zZwZ9FuuHQxjWQAQQFc6cOUj59UfUMZLp7/.pGQiyS3aBsYlKgXBe',
    created_at: '2021-11-21T15:47:44.533Z',
    modified_at: '2021-11-22T15:47:44.533Z'
  },
  {
    first_name: 'Oliver',
    last_name: 'Garcia',
    email: 'oliver.garcia@university.com',
    password: '$2a$10$zZwZ9FuuHQxjWQAQQFc6cOUj59UfUMZLp7/.pGQiyS3aBsYlKgXBe',
    created_at: '2021-11-21T15:47:44.533Z',
    modified_at: '2021-11-22T15:47:44.533Z'
  }
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
