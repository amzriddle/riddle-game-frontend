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

const getMe = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  
  return api.get(`/user/me`, {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  });
};

const getAllUsers = () => {
  return api.get(`/user`);
};

const postLogin = (email, password) => {
  // console.log(email,password)
  return api.post(`/auth/signin`, qs.stringify({email: email, password: password}) );
};

const postRegister = (email, password) => {
  // console.log(email,password)
  return api.post(`/auth/signup`, qs.stringify({email: email, password: password}) );
};

const getLogout = () => {
  return api.get(`/logout`);
}

const postAnswer = (id, answer) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return api.post(`/riddle/answer/${id}`, qs.stringify({answer: answer}), {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  })
}

const exportedObject =  {
  getAllChallenges,
  getChallenge,
  getUser,
  getMe,
  getAllUsers,
  postLogin,
  postRegister,
  getLogout,
  postAnswer
};

export default exportedObject;