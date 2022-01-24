import api from '@/api/base'

export default {
    async fetch(date, search) {
        try {
            let url = date ? `/tutoring/${date}` : `/tutoring`;
            const query = search && search.trim().length > 0 ? { params: { search: search.trim().toUpperCase() } } : {}
            const response = await api().get(url, query);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async add(tutoring) {
        try {
            const response = await api().put(`/tutoring`, tutoring);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }

    },
    async update(tutoring) {
        try {
            const response = await api().patch(`/tutoring/${tutoring._id}`, tutoring);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    },
    async delete(tutoring) {
        try {
            const response = await api().delete(`/tutoring/${tutoring._id}`);
            return response.data;
        } catch (ex) {
            console.log(ex);
            return undefined;
        }
    }

}