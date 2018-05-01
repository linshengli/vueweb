import axios from "axios";
import qs from "qs";
let base = "http://202.120.40.87:22471/Entity/Udfbdea011cb3c/qianmai"
export const fetchAllUser = params => {
  return axios.get(`${base}/User/`, params)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const fetchAllMoment = params => {
  return axios.get(`${base}/Moment/`, params)
    .then(res => res.data)
    .catch(err => console.log(err));
};

export const UpdateMoment = (UID, params) => {
  return axios.put(`${base}/Moment/${UID}`, params)
    .then(res => res.data)
    .catch(err => console.log(err))
};

export const UpdatePass = (content) => {
  let id = content.id;
  let updateURL = `${base}/Moment/${id}`;
  content.passed = 1;
  console.log("updateURL" + updateURL)
  console.log("content" + content)
  return UpdateMoment(id, content)
    .then(res => res.data)
    .catch(err => console.log(err))
};

export const UpdateMomentFail = (content) => {
  let id = content.id;
  let updateURL = `${base}/Moment/${id}`;
  content.passed = 2;
  console.log("updateURL" + updateURL)
  console.log("content" + content)
  return UpdateMoment(id, content)
    .then(res => res.data)
    .catch(err => console.log(err))
};

export const AddMoment = (content) => {
  let URL = `${base}/Moment/`;
  return axios.post(URL, content)
    .then(res => res.data)
    .catch(err => console.log(err))
}
