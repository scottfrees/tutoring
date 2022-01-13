import api from '@/api/base'

export default {

    /**
     * 
     * @param {*} username 
     * @param {*} password 
     */
    async login(username, password) {
        try {
            const response = await api().post(`/auth/login`, { username, password });
            console.log(response);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },

    async logout() {
        try {
            const response = await api().post(`/auth/logout`, {});
            return response.data;
        } catch (ex) {
            return undefined;
        }
    },

    async user() {
        try {
            const response = await api().post(`/auth/user`, {});
            return response.data;
        } catch (ex) {
            return undefined;
        }
    },
}