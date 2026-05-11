import api from "../features/axiosConfig";

export const getUsersTransactions = async (
  userId: string | undefined,
): Promise<any[]> => {
  const response = await api.get<any[]>(`/transaction/user/${userId}`);
  return response.data;
};
