export const validateEmail = (email) => {
  let error = "";
  if (!email) {
    error = 'Debes ingresar un email';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    error = 'Ingrese un email valido';
  }
  return error;
}
export const validatePass = (password) => {
  let error = "";
  if (!password) {
    error = 'Debes ingresar una contraseña';
  } else if (!/(?=.*[0-9])/.test(password)) {
    error = 'Ingrese una contraseña válida';
  }
  return error;
};
