

const isStaff = async function(req, res, next){
  try{
    let userRoles = [];
    if(req.user){
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
     if(userRoles.includes("staff")){
        next()
       return;
     }
       return res.status(401).send({
         message: 'Access denied1'
       })
  }catch (error){
    return res.status(401).json({message: "Access denied2"})
  }
  
}

const isStudent = async function(req, res, next) {
  try {
    let userRoles = [];
    if (req.user) {
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
    if (userRoles.includes("student")) {
      next()
      return;
    }
    return res.status(401).send({
      message: 'Access denied'
    })
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}

const isInstructor = async function(req, res, next) {
  try {
    let userRoles = [];
    if (req.user) {
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
    if (userRoles.includes("student")) {
      next()
      return;
    }
    return res.status(401).send({
      message: 'Access denied'
    })
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}

const isPm = async function(req, res, next) {
  try {
    let userRoles = [];
    if (req.user) {
      req.user.roles.forEach(role => {
        userRoles.push(role.name)
      })
    }
    if (userRoles.includes("pm")) {
      next()
      return;
    }
    return res.status(401).send({
      message: 'Access denied'
    })
  } catch (error) {
    return res.status(401).json({message: "Access denied"})
  }
}




module.exports = {
  isStaff,
  isStudent,
  isInstructor
};



