import api from '@/api/base'

export default {
    async subjects(term) {
        try {
            const response = await api().get(`/sections/${term}/subjects`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },

    async numbers(term, subject) {
        try {
            const response = await api().get(`/sections/${term}/subjects/${subject}/numbers`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async sections(term, subject, searchable) {
        try {
            const response = await api().get(`/sections/${term}/subjects/${subject}/numbers/sections`, { params: { searchable: searchable } });
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    }
}