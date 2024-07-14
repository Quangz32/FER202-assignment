import axios from "axios";

export default async function LoginService(email, password) {
  let users = [];
  await axios.get("http://localhost:9999/users").then((res) => {
    // console.log(res);
    users = res.data;
  });

  return users?.find((user) => user.email === email && user.password === password);
}
