import axios from "axios";

export const getAllUser = async () => {
  const res = await axios.get(`http://localhost:9999/users`);
  return res.data;
};

export const addNewUser = async (userData) => {
  const users = await getAllUser();
  const avatars = [
    "avt1.png",
    "avt2.jpeg",
    "avt3.png",
    "avt4.jpeg",
    "avt5.png",
    "avt6.png",
    "avt7.jpeg",
    "avt8.jpeg",
    "avt9.png",
    "avt10.png",
    "avt11.png",
    "avt12.png",
    "avt13.jpeg",
    "avt14.jpeg",
    "avt15.png",
  ];

  if (users.find((u) => u.email === userData.email)) {
    return { success: false, message: "Same email already exist", data: undefined };
  }

  //   let newUser = {};
  const res = await axios.post(`http://localhost:9999/users`, {
    id: String(parseInt(users[users.length - 1].id) + 1),
    ...userData,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
  });

  if (res.status === 201) {
    return { success: true, message: "Register success", data: res.data };
  }
};

export const changePassword = async (user, oldPassword, newPassword) => {
  const getRes = await axios.get(`http://localhost:9999/users/${user.id}`);
  const userInDB = getRes.data;
  console.log(userInDB);

  if (userInDB.password !== oldPassword) {
    return {
      success: false,
      message: "Wrong current password",
    };
  }

  const updatedUser = await axios.put(`http://localhost:9999/users/${user.id}`, {
    ...userInDB,
    password: newPassword,
  });

  return {
    success: true,
    message: "Your password has been updated",
    data: updatedUser,
  };
};
