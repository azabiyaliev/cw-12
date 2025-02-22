
export interface IRegister {
    email: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface ILogin {
    email: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface IUser {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    googleId: string;
    avatar: string;
}

export interface IRegisterResponse {
    user: IUser;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]:{
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface IPicture {
    _id: string;
    user: IUser;
    title: string;
    image: string;
}


