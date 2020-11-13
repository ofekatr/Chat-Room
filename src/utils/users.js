const users = [];

function userJoin(user) {
  users.push(user);
  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
    userJoin,
    getUser,
};
