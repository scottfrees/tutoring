import api from '@/api/base'

export default {
    async fetch() {
        try {
            const response = await api().get(`/users`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async add(user) {
        try {
            const response = await api().put(`/users`, user);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }

    },
    async edit(user) {
        try {
            const response = await api().patch(`/users/${user._id}`, user);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async drop(user) {
        try {
            const response = await api().delete(`/users/${user._id}`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    }

}