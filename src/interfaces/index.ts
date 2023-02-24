export interface USER {
    id: string,
    name: string,
    image: string,
    email: string,
    username?: string,
    friends?: string[],
    requests?: string[] 
}