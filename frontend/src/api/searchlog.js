import api from '@/api/base'

export default {
    async fetch(q) {
        try {
            const response = await api().get(`/searchlogs`, { params: q });
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async download(q) {
        try {
            const response = await api().get(`/searchlogs/export`, { params: q, responseType: 'blob' });
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },

}