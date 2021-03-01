export function validateEmptyField(userData, p){
  let errors = {};
  if (!userData.firstName) {
    errors.firstName = 'Debes ingresar un nombre';
  }
  
  if (!userData.lastName) {
    errors.lastName = 'Debes ingresar un apellido';
  }
  
  if (!userData.dateOfBirth) {
    errors.dateOfBirth = 'Debes ingresar tu fecha de nacimiento';
  }
  
  if (!userData.email) {
    errors.email = 'Debes ingresar un email';
  }
  
  if (!userData.address) {
    errors.address = 'Debes ingresar una dirección';
  }
  
  if (!userData.city) {
    errors.city = 'Debes ingresar una Ciudad';
  }
  
  if (!userData.state) {
    errors.state = 'Debes ingresar una Provincia';
  }
  
  if (!userData.country) {
    errors.country = 'Debes ingresar un País';
  }
  
  if (!userData.nationality) {
    errors.nationality = 'Debes ingresar tu nacionalidad';
  }
  
  if (!userData.cellphone) {
    errors.cellphone = 'Debes ingresar una teléfono';
  }
  
  return Object.assign(p, errors);
}

export function updateValidate (userData) {
  let errors = {};
  
  if (userData.firstName && userData.firstName.length < 2) {
    errors.firstName = 'El nombre es muy corto';
  }
  
  if (userData.lastName && userData.lastName.length < 2) {
    errors.lastName = 'El apellido es muy corto';
  }
  
  
  if (userData.dateOfBirth && userData.dateOfBirth.length < 2) {
    errors.lastName = 'El apellido es muy corto';
  }
  
  if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Ingrese un email valido';
  }
  
  if (userData.address && userData.address.length < 2) {
    errors.address = 'La dirección es muy corta';
  }
  
  if(userData.city && userData.city.length < 2) {
    errors.city = 'El nombre de la ciudad es muy corto';
  }
  
  if (userData.state && userData.state.length < 2) {
    errors.state = 'El nombre del estado es muy corto';
  }
  
  if (userData.country && userData.country.length < 2) {
    errors.country = 'El nombre del País es muy corto';
  }
  
  if (userData.nationality && userData.nationality.length < 2) {
    errors.nationality = 'Ingrese una nacionalidad válida';
  }
  
  if (userData.cellphone && !validaNumericos(userData.cellphone)) {
    errors.cellphone = 'Ingresa un numero válido';
  }
  return errors;
}

export function validaNumericos(value){
  for(let i=0; i<value.length;i++){
    let code = value.charCodeAt(i);
    if(code < 48 || code > 57){
      return false;
    }
  }
  return true;
}
