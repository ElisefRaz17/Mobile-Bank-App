import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface AccountRequest{}

export interface AccountResponse{
    userId:any;
    bankName:string;
    balance:Double;
    type:string;
    details:string;
}