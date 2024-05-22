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
    getMessagesByDialog(dialogId: string) {
        return instance
            .get<any>(`${baseUrl}/messages/${dialogId}`)
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
