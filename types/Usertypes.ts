export interface userTypes{
    profile_picture: string,
    name: string,
    
    email: string,
    password: string,
}
export interface questionTypes{
    id: string,
    name: string,
    image: string | undefined,
    text: string,
    grade: string,
    calculator: boolean,
    answer: string,
   
}