export function validateEmail(email) {
  // Регулярное выражение для проверки email-адреса
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
export function validatePassword(password) {
  // Проверка длины пароля
  if (password.length < 8) {
    return false;
  }

  // Проверка наличия цифры
  var hasNumber = /\d/.test(password);
  if (!hasNumber) {
    return false;
  }

  // Все проверки прошли успешно
  return true;
}
