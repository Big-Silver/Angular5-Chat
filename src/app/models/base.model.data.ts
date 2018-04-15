export class AuthenticationModel {
    workspaceId: string;
    email: string;
    password: string;
}

export class SignupModel {
    workspaceId: string;
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}

export class ChangepasswordModel {
    workspaceId: string;
    email: string;
    password: string;
    newPassword: string;
}