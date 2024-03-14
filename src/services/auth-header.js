export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.jwt) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-access-token': user.jwt };       // for Node.js Express back-end
  } else {
    return {};
  }
}
