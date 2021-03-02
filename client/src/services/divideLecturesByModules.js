export const divideLecturesByModules = lectures => {
    const lecturesByModule = {};
    lectures.forEach(lect => {
        if(!lecturesByModule[lect.module]){
            lecturesByModule[lect.module] = [lect]
        } else {
            lecturesByModule[lect.module] = lecturesByModule[lect.module].concat(lect)
        }
    })
    let res = [];
    for(let prop in lecturesByModule){
        res.push(lecturesByModule[prop])
    }
    return res;
}



