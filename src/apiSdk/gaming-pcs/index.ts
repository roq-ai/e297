import axios from 'axios';
import queryString from 'query-string';
import { GamingPcInterface, GamingPcGetQueryInterface } from 'interfaces/gaming-pc';
import { GetQueryInterface } from '../../interfaces';

export const getGamingPcs = async (query?: GamingPcGetQueryInterface) => {
  const response = await axios.get(`/api/gaming-pcs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGamingPc = async (gamingPc: GamingPcInterface) => {
  const response = await axios.post('/api/gaming-pcs', gamingPc);
  return response.data;
};

export const updateGamingPcById = async (id: string, gamingPc: GamingPcInterface) => {
  const response = await axios.put(`/api/gaming-pcs/${id}`, gamingPc);
  return response.data;
};

export const getGamingPcById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/gaming-pcs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGamingPcById = async (id: string) => {
  const response = await axios.delete(`/api/gaming-pcs/${id}`);
  return response.data;
};
