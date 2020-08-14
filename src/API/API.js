import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { "API-KEY": '9b5c704f-1c0c-466c-a264-da866cc90a5f' }
});

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return (
            instance
                .get(`users?count=${pageSize = 10}&page=${currentPage}`)
                .then(response => {
                    return response.data
                })
        )
    },

    followUsers(userId) {
        return (
            instance
                .post(`follow/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },

    unfollowUsers(userId) {
        return (
            instance
                .delete(`follow/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    }
};

export const profileAPI = {

    getProfile(userId) {
        return (
            instance
                .get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },

    getStatus(userId) {
        return (
            instance
                .get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },

    updateStatus(status) {
        return (
            instance
                .put(`profile/status`, { status: status })
                .then(response => {
                    return response
                })
        )
    }
};

export const authAPI = {
    me() {
        return (
            instance
                .get(`auth/me`)
                .then(response => {
                    return response
                })
        )
    }
};

export const loginAPI = {
    login(email, password, rememeberMe) {
        return (
            instance
                .post(`auth/login`, {email, password, rememeberMe })
                .then(response => {
                    return response
                })
        )
    },

    logout() {
        return (
            instance
                .delete(`auth/login`)
                .then(response => {
                    return response
                })
        )
    }
}