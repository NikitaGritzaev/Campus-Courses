export const LOADING = -1;
export const GUEST = 0;
export const USER = 1;
export const STUDENT = 2;
export const TEACHER = 3;
export const BOTH = 4;
export const getNavbarType = (authorized, roles) => {
    if (authorized === true && roles === undefined) return LOADING; 
    if (!authorized) return GUEST;
    if (!roles.isStudent && !roles.isTeacher) return USER;
    if (roles.isStudent && !roles.isTeacher) return STUDENT;
    if (!roles.isStudent && roles.isTeacher) return TEACHER;
    return BOTH;
}