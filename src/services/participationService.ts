import httpService from './httpService';

interface ParticipationData {
  firstName: string;
  lastName: string;
  percentage: number;
  userId: number | null | undefined;
}

export const createParticipation = async (data: ParticipationData, authToken?: string) => {
    const response = await httpService.post(`/participation`, data,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
};

export const getAllParticipationByUserId = async (authToken: string, userId: any) => {
  const response = await httpService.get(`/participation/user/${userId}`,
  {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const updateParticipationById = async (data: ParticipationData, id: any, authToken: string) => {
  const response = await httpService.put(`/participation/${id}`,data,
  {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const deleteParticipationById = async (id: any, authToken: string) => {
  const response = await httpService.delete(`/participation/${id}`,
  {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};


