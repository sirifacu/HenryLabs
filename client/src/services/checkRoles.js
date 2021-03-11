


export const checkRoles = (user, roles) => {

    if(user.hasOwnProperty("roles")){
        if(user.roles.length){
          if(user.roles.find(({name}) => roles.includes(name))){
            return true
          }
        }
    }
    return false;
} 

