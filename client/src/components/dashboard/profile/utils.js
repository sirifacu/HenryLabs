import Moment from "moment";

export function validateEmptyField(userData, p){
  let errors = {};
  
  if (!userData.email) {
    errors.email = 'Debes ingresar un email';
  }
  
  if (!userData.address) {
    errors.address = 'Debes ingresar una dirección';
  } else if (userData.address && userData.address.length < 2) {
    errors.address = 'La dirección es muy corta';
  }

  if (!userData.githubUser) {
    errors.githubUser = 'Debes ingresar un usuario de Github';
  } else if (userData.githubUser && userData.githubUser.length < 2) {
    errors.githubUser = 'El usuario es muy corto';
  }

  if (!userData.googleUser) {
    errors.googleUser = 'Debes ingresar tu cuenta de Gmail';
  } else if (userData.googleUser && userData.googleUser.length < 2) {
    errors.googleUser = 'La dirección es muy corto';
  }

  if (!userData.linkedinUser) {
    errors.linkedinUser = 'Debes ingresar un usuario de linkedIn';
  } else if (userData.linkedinUser && userData.linkedinUser.length < 2) {
    errors.linkedinUser = 'El usuario es muy corto';
  }
  
  if (!userData.city) {
    errors.city = 'Debes ingresar una Ciudad';
  } else if(userData.city && userData.city.length < 2) {
    errors.city = 'El nombre de la ciudad es muy corto';
  }
  
  if (!userData.state) {
    errors.state = 'Debes ingresar una Provincia';
  } else if (userData.state && userData.state.length < 2) {
    errors.state = 'El nombre de la Provincia es muy corto';
  }
  
  if (!userData.country) {
    errors.country = 'Debes ingresar un País';
  } else if (userData.country && userData.country.length < 2) {
    errors.country = 'El nombre del País es muy corto';
  }
  
  if (!userData.cellphone) {
    errors.cellphone = 'Debes ingresar una teléfono';
  } else if (userData.cellphone && userData.cellphone.length < 6) {
    errors.cellphone = 'El numero es muy corto';
  }
  
  return Object.assign(p, errors);
}

export function updateValidate (userData) {
  let errors = {};
  
  if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = 'Ingrese un email valido';
  }

  if (userData.googleUser && !/\S+@\S+\.\S+/.test(userData.googleUser)) {
    errors.googleUser = 'Ingrese un email valido';
  }
  
  if (userData.cellphone && !validateNumber(userData.cellphone)) {
    errors.cellphone = 'Ingresa un numero válido';
  }
  return errors;
}

export function validateNumber(value){
  for(let i=0; i<value.length;i++){
    let code = value.charCodeAt(i);
    if(code < 48 || code > 57){
      return false;
    }
  }
  return true;
}


export function formatDate(date) {
  let formatDate = new Moment(date);
  return formatDate.format('DD/MM/YYYY')
}
