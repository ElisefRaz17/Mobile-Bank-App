interface SignInDetail{
    loginId:string;
    authFlowType:string;
}
export interface User{
    signInDetails:SignInDetail[];
    userId:string;
    username:string;
}