import api from "../api/axiosConfig";
import { AccountRequest, AccountResponse } from "../types/account";

export const addAccount = async(accountData:AccountRequest):Promise<AccountResponse> => {
    const response = await api.post<AccountResponse>('/account',accountData);
    return response.data;
}

export const getUsersAccounts = async(userId:string|undefined):Promise<any[]> => {
    const response = await api.get<any[]>(`/account/user/${userId}`)
    return response.data;

}