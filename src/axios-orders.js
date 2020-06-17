import axios from 'axios';

const instance=axios.create({
  baseURL: 'https://react-burger-a3099.firebaseio.com/',
});

export default instance;