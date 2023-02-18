import api from "./http-common";

const getAllChallenges = () => {
  return api.get(`/riddle`);
};

const getChallenge = (id: number) => {
  return api.get(`/riddle/${id}`);
};

const getUser = () => {
  return api.get(`/user`);
};

const getMe = () => {
  var token = JSON.parse(localStorage.getItem("token") || "{}");

  return api.get(`/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllUsers = () => {
  return api.get(`/user`);
};

const postLogin = (email: any, password: any) => {
  console.log(email, password);
  return api.post(`/auth/signin`, { email: email, password: password });
};

const postRegister = (email: any, password: any) => {
  // console.log(email,password)
  return api.post(`/auth/signup`, { email: email, password: password });
};

const getLogout = () => {
  return api.get(`/auth/logout`);
};

const postAnswer = (id: any, answer: any) => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  return api.post(
    `/riddle/answer/${id}`,
    { answer: answer },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getAnswered = () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  return api.get(`/riddle/answered`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getNextAndLastRiddle = () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  return api.get(`/riddle/next`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const exportedObject = {
  getAllChallenges,
  getChallenge,
  getUser,
  getMe,
  getAllUsers,
  postLogin,
  postRegister,
  getLogout,
  postAnswer,
  getAnswered,
  getNextAndLastRiddle,
};

export default exportedObject;
