export interface Person {
    id: string,
    name: string,
    weight: number | null,
    age: number | null,
    friends: { [key: string]: Boolean }
}