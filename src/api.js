import api from "./http-common";
import qs from 'qs';

const getAllChallenges = () => {
  return api.get(`/riddle`);
};

const getChallenge = id => {
  return api.get(`/riddle/${id}`);
};

const getUser = () => {
  return api.get(`/user`);
};

const getAllUsers = () => {
  return api.get(`/user`);
};

const postLogin = (email, password) => {
  console.log(email,password)
  return api.post(`/auth/signin`, qs.stringify({email: email, password: password}) );
};

const postRegister = (email, password) => {
  console.log(email,password)
  return api.post(`/auth/signup`, qs.stringify({email: email, password: password}) );
};

const getLogout = () => {
  return api.get(`/logout`);
}

const exportedObject =  {
  getAllChallenges,
  getChallenge,
  getUser,
  getAllUsers,
  postLogin,
  postRegister,
  getLogout
};

export default exportedObject;