import axios from "axios";
export const POST_JOB = 'POST_JOB';

export const postJob = (values) => (dispatch) => {
    console.log('values en actioffn', values.title)
    console.log('type', typeof values.title)
    axios
     .post(`/createjobs/job`, {
        title: values.title,
        type: values.type,
        contract: values.contract,
        webProfile: values.webProfile,
        description: values.description,
        requirements: values.requirements,
        benefits: values.benefits,
        salary: values.salary,
        others: values.others,
    }).then((data) => {
        console.log('data', data)
        dispatch({
            type: POST_JOB,
            payload: data
        })
    }).catch((err)=>console.log(err))
}