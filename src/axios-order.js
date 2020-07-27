import axios from 'axios';

const instance = 
    axios.create({
        baseURL:"https://react-burgerbuilder-1e998.firebaseio.com"
    });

export default instance;