import { GET_USERS, GET_USER, GET_INSTRUCTORS, GET_STUDENTS, GET_PM, 
         GET_INFO_USER_COHORT, GET_USER_BY_ROLE, UPDATE_USER, COMPLETE_DATA, 
         REGISTER_USER, SET_COHORT_MESSAGE, CLEAN_COHORT_MESSAGE, CREATE_MIGRATION_REQUEST, 
         UPGRADE_TO_PM, DELETE_ROL_PM, GET_COHORT_PM } from './userAction'

const initialState = {
    users: [],
    user: {},
    usersByRole: [],
    students: [],
    pm: [],
    pms: [],
    cohortPms: [],
    instructors: [],
    infoUserCohort: {},
    updatedUser: false,
    cohortMessage: '',
    migrationRequest: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_USERS: {
            return {
                ...state,
                users: action.payload
            }
        }

        case GET_USER:{
            return {
                ...state,
                user: action.payload
            }
        }

        case GET_STUDENTS:{
            return {
                ...state,
                students: action.payload
            }
        }

        case GET_PM:{
            return {
                ...state,
                pm: action.payload
            }
        }

        case GET_INSTRUCTORS: {
            return {
                ...state,
                instructors: action.payload
            }
        }
        case GET_INFO_USER_COHORT: {
            return {
                ...state,
                infoUserCohort: action.payload
            }
        }
        case GET_USER_BY_ROLE: {
            return {
                ...state,
                usersByRole: action.payload
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                updatedUser: true,
                user: action.payload
            }
        }
        case COMPLETE_DATA: {
            return {
                ...state,
                updateUser: true,
                user: action.payload
            }
        }

        case REGISTER_USER: {
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        }

        case SET_COHORT_MESSAGE: {
            return {
                ...state,
                cohortMessage: action.payload
            }
        }

        case CLEAN_COHORT_MESSAGE: {
            return {
                ...state,
                cohortMessage: ''
            }
        }

        case CREATE_MIGRATION_REQUEST:
            return {
                ...state,
                migrationRequest: action.payload
            };
        
        case UPGRADE_TO_PM: {
            return {
                ...state,
                pms: action.payload
            }
        } 

        case DELETE_ROL_PM: {
            return {
                ...state,
                pms: action.payload
            }
        }

        case GET_COHORT_PM: {
            return {
                ...state,
                cohortPms: action.payload
            }
        }

        default:
            return state
    }
}
