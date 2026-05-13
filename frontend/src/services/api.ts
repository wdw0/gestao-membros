import axios from 'axios';
import { Member, MemberRequest } from '../types/member';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const memberService = {
  getAll: async (): Promise<Member[]> => {
    const { data } = await api.get('/members');
    return data;
  },

  create: async (payload: MemberRequest): Promise<Member> => {
    const { data } = await api.post('/members', payload);
    return data;
  },

  update: async (id: number, payload: MemberRequest): Promise<Member> => {
    const { data } = await api.put(`/members/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/members/${id}`);
  },
};

export const extractApiError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return 'Ocorreu um erro inesperado';
};
