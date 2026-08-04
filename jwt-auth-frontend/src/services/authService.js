import axios from 'axios'


const api = axios.create({
    baseURL:`${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`,
})

api.interceptors.request.use(
    (config)=>{

        const token = localStorage.getItem("token");


        if(token){

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    }
);


async function signUp(formData){
    const response = await api.post('/sign-up',formData)



}

async function signIn(formData){
    const response = await api.post('/sign-in',formData)
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user
}


async function getCurrentUser(){

    const response = await api.get(
        "/me"
    );


    return response.data;

}



function logout(){

    localStorage.removeItem("token");

}

export {
  signUp,
  signIn,
  getCurrentUser,
  logout
};

