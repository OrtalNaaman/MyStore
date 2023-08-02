function validName(username: string) {
  return username.length < 3 || username.length > 15 ? false : true;
}

function validEmail(email: string) {
  var regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regex.test(email)) return true;
  else return false;
}
function validPassword(password: string) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/;
  if (regex.test(password)) return true;
  else return false;
}

export { validName, validEmail, validPassword };
