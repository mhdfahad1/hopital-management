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

export const addEmployeeAPI = async (employee) => {
    return await commonAPI("POST", `${Base_url}/add/employee`, employee, "")
}

export const addHeadAPI = async (Head) => {
    return await commonAPI("POST", `${Base_url}/add/head`, Head, "")
}

export const getAllHeadAPI = async () => {
    return await commonAPI("GET", `${Base_url}/get/head`, "", "")
}
export const getdepartmentemployeesAPI = async (name) => {
    return await commonAPI("GET", `${Base_url}/get/department/employees/${name}`, "", "")
}
export const getdepartmentHeadsAPI = async (name) => {
    return await commonAPI("GET", `${Base_url}/get/department/heads/${name}`, "", "")
}

export const deleteEmployeeAPI = async (_id) => {
    return await commonAPI("DELETE", `${Base_url}/delete/employee`, _id, "")
}

export const deleteHeadAPI = async (_id) => {
    return await commonAPI("DELETE", `${Base_url}/delete/head`, _id, "")
}

export const editEmployeeAPI = async (employee) => {
    return await commonAPI("PUT", `${Base_url}/edit/employee`, employee, "")
}

export const editHeadAPI = async (head) => {
    return await commonAPI("PUT", `${Base_url}/edit/head`, head, "")
}

export const getOneEmployeeAPI = async (id) => {
    return await commonAPI("GET", `${Base_url}/get/one/employee/${id}`, "", "")
}

export const getOneHeadAPI = async (id) => {
    return await commonAPI("GET", `${Base_url}/get/one/head/${id}`, "", "")
}

export const getOneDepartmentAPI = async (name) => {
    return await commonAPI("GET", `${Base_url}/get/one/department/${name}`, "", "")
}
export const getONeHeadbynameAPI = async (name) => {
    return await commonAPI("GET", `${Base_url}/get/one/head/name/${name}`, "", "")
}
