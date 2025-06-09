import { DataProvider } from "react-admin";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const query = {
      page: page,
      limit: perPage,
    };

    const url = `${API_URL}/${resource}`;
    const { data } = await axios.get(url, {
      params: query,
    });
    return {
      data:
        data?.data?.posts ||
        data?.data?.users ||
        data?.data?.requests ||
        data?.data ||
        data,
      total: (
        data?.data?.posts ||
        data?.data?.users ||
        data?.data?.requests ||
        data?.data ||
        data
      )?.length,
    };
  },

  getOne: async (resource, params) => {
    const { data } = await axios.get(`${API_URL}/${resource}/${params.id}`, {});
    return { data: data?.data || data };
  },

  getMany: async (resource, params) => {
    const { data } = await axios.get(`${API_URL}/${resource}`, {
      params: { id: params.ids },
    });
    return { data };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...params.filter,
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };

    const url = `${API_URL}/${resource}`;
    const { data, headers } = await axios.get(url, {
      params: query,
    });

    return {
      data,
      total: parseInt(headers["x-total-count"] || data.length.toString(), 10),
    };
  },

  create: async (resource, params) => {
    const { data } = await axios.post(
      `${API_URL}/${resource}`,
      params.data,
      {}
    );
    return { data: data?.data || data };
  },

  update: async (resource, params) => {
    const { data } = await axios.put(
      `${API_URL}/${resource}/${params.id}`,
      params.data,
      {}
    );
    return { data };
  },

  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        axios.put(`${API_URL}/${resource}/${id}`, params.data, {})
      )
    );
    return { data: responses.map((response) => response.data.id) };
  },

  delete: async (resource, params) => {
    const { data } = await axios.delete(
      `${API_URL}/${resource}/${params.id}`,
      {}
    );
    return { data };
  },

  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) => axios.delete(`${API_URL}/${resource}/${id}`, {}))
    );
    return { data: responses.map((response) => response.data.id) };
  },

  custom: {
    toggleBlockUser: async (id: string) => {
      try {
        const { data } = await axios.put(`${API_URL}/users/${id}/toggle-block`);
        return { data: data.message };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.message };
        }
        return { error: "Operation failed" };
      }
    },

    acceptContactRequest: async (id: string) => {
      try {
        const { data } = await axios.patch(
          `${API_URL}/contact-requests/${id}/accept`
        );
        return { data: data.message };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.message };
        }
        return { error: "Operation failed" };
      }
    },

    completeContactRequest: async (id: string) => {
      try {
        const { data } = await axios.patch(
          `${API_URL}/contact-requests/${id}/complete`
        );
        return { data: data.message };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.message };
        }
        return { error: "Operation failed" };
      }
    },

    deletePost: async (id: string) => {
      try {
        const { data } = await axios.delete(`${API_URL}/posts/admin/${id}`);
        return { data: data.message };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.message };
        }
        return { error: "Operation failed" };
      }
    },

    acceptPost: async (id: string) => {
      try {
        const { data } = await axios.put(`${API_URL}/posts/admin/${id}/accept`);
        return { data: data.message };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.message };
        }
        return { error: "Operation failed" };
      }
    },
  },
};

export default dataProvider;
