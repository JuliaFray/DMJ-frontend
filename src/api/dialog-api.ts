import instance from "./api";

const baseUrl = 'dialog';
export const dialogAPI = {
    getAllDialogs(query: string) {
        return instance
            .get<any>(`${baseUrl}`)
            .then(response => {
                return response.data
            })
    },
    getMessagesByDialog(query: string) {
        return instance
            .get<any>(`${baseUrl}/messages`)
            .then(response => {
                return response.data
            })
    },
    getUsersWithStatus(query: string) {
        return instance
            .get<any>(`${baseUrl}/users`)
            .then(response => {
                return response.data
            })
    }
};
