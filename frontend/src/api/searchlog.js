import api from '@/api/base'

export default {
    async fetch() {
        try {
            const response = await api().get(`/searchlogs`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async download() {
        try {
            const response = await api().get(`/searchlogs/export`, { responseType: 'blob' });
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },

}