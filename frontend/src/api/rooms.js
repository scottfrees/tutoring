import api from '@/api/base'

export default {
    async fetch() {
        try {
            const response = await api().get(`/rooms`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async add(room) {
        try {
            const response = await api().put(`/rooms`, { room: room });
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }

    },

    async drop(room) {
        try {
            const response = await api().delete(`/rooms`, { data: { room: room } });
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    }

}