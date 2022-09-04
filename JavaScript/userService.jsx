import axios from "axios";


const logUser = (payload) => {

    const config = {
        method: "POST",
        url: "https://api.remote.dev/api/users/login",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config)

};

function getCurrentUser(payload) {
    console.log("getting current user",)
    const config = {
        method: "GET",
        url: "https://api.remote.dev/api/users/current",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
};

function getUserId(id) {
    console.log("Services is executing..... here is your Id=", id);
    const config = {
        method: "GET",
        url: "https://api.remote.dev/api/users/" + id,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config);
}



function registerUser(payload) {
    console.log("Registering page")
    const config = {
        method: "POST",
        url: "https://api.remote.dev/api/users/register",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}


function getFriends(payload) {
    console.log("Getting Friends")
    const config = {
        method: "GET",
        url: "https://api.remote.dev/api/friends?pageIndex=0&pageSize=10",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}



function deletePerson(personId) {
    const config = {
        method: "GET",
        url: "https://api.remote.dev/api/friends/" + personId,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    console.log("Ajax call went through")

    return axios(config)
};


function addFriend(payload) {
    console.log("Registering page")
    const config = {
        method: "POST",
        url: "https://api.remote.dev/api/friends",
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
}



function goToEditPerson(Id) {
    const config = {
        method: "GET",
        url: "https://api.remote.dev/api/friends/" + Id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    console.log("happening in the middle")

    return axios(config)
};

export { logUser, getCurrentUser, getUserId, registerUser, getFriends, deletePerson, addFriend, goToEditPerson };
