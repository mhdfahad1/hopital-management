import { Base_url } from "./Baseurl";
import { commonAPI } from "./commonApi";

// admin login
export const adminLoginAPI = async (user) => {
    return await commonAPI("POST", `${Base_url}/admin/login`, user, "")
}
// add department
export const addDepartmentAPI = async (department) => {
    return await commonAPI("POST", `${Base_url}/add/department`, department, "")
}
// get all department
export const getAlldepartmentsAPI = async () => {
    return await commonAPI("GET", `${Base_url}/get/department`, "", "")
}

export const deletedepartmentsAPI = async (_id) => {
    return await commonAPI("DELETE", `${Base_url}/delete/department`, _id, "")
}

export const editdepartmentsAPI = async (department) => {
    return await commonAPI("PUT", `${Base_url}/edit/department`, department, "")
}
export const getOnedepartmentsAPI = async (id) => {
    return await commonAPI("GET", `${Base_url}/get/one/department/${id}`, "", "")
}
export const addEmployeeAPI = async (employee) => {
    return await commonAPI("POST", `${Base_url}/add/employee`, employee, "")
}