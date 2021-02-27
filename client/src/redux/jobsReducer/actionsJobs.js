import axios from "axios";
export const POST_JOB = 'POST_JOB';

export const postJob = (values) => (dispatch) => {
    axios
     .post(`/createjobs/job`, {
        title: values.title,
        type: values.type,
        contract: values.contract,
        webProfile: values.webProfile,
        salary: values.salary,
        description: values.description,
        requirements: values.requirements,
        benefits: values.benefits,
        others: values.others,
    }).then((data) => {
        dispatch({
            type: POST_JOB,
            payload: data
        })
    }).catch((err)=>console.log(err))
}