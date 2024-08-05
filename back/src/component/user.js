// users.js
const users = [];

// Создаем объект для хранения кодов подтверждения
const confirmations = {};

// Метод для поиска пользователя по email
function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

// Метод для создания нового пользователя
function createUser(email, password) {
  const user = { email, password };
  users.push(user);
  return user;
}

// Метод для обновления пароля пользователя
function updateUserPassword(email, newPassword) {
  const user = getUserByEmail(email);
  if (user) {
    user.password = newPassword;
    return true;
  }
  return false;
}

// Метод для создания кода подтверждения
function createConfirmationCode(email) {
  const code = Math.floor(100000 + Math.random() * 900000); // Генерация 6-значного кода
  confirmations[code] = email;
  return code;
}

// Метод для получения email по коду подтверждения
function getEmailByCode(code) {
  return confirmations[code];
}

// Метод для удаления кода подтверждения
function deleteConfirmationCode(code) {
  delete confirmations[code];
}

module.exports = {
  getUserByEmail,
  createUser,
  updateUserPassword,
  createConfirmationCode,
  getEmailByCode,
  deleteConfirmationCode,
};
