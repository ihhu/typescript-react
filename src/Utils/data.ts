export interface Todo {
    id:number,
    user: string;
    date: string;
    content: string;
    isCompleted: boolean;
}

export interface User {
    id: number;
    name: string;
    avatar: string;
}

export function getUserById(userId:number){
    return userList.filter(user=>user.id === userId)[0];
}

export const todoListData: Todo[] = [
    {
        id:1,
        content: "图雀社区：汇聚精彩的免费实战教程1",
        user: "mRcfps",
        date: "2020年3月2日 19:34",
        isCompleted: false
    },
    {
        id:2,
        content: "图雀社区：汇聚精彩的免费实战教程2",
        user: "pftom",
        date: "2020年3月2日 19:34",
        isCompleted: true
    },
    {
        id:3,
        content: "图雀社区：汇聚精彩的免费实战教程3",
        user: "Holy",
        date: "2020年3月2日 19:34",
        isCompleted: false
    },
    {
        id:4,
        content: "图雀社区：汇聚精彩的免费实战教程4",
        user: "crxk",
        date: "2020年3月2日 19:34",
        isCompleted: true
    },
    {
        id:5,
        content: "图雀社区：汇聚精彩的免费实战教程5",
        user: "Pony",
        date: "2020年3月2日 19:34",
        isCompleted: false
    }
];

export const userList: User[] = [
    {
        id:0,
        name: "图雀社区",
        avatar: "https://avatars0.githubusercontent.com/u/39240800?s=60&v=4"
    },
    {
        id: 1,
        name: "mRcfps",
        avatar: "https://avatars0.githubusercontent.com/u/23410977?s=96&v=4"
    },
    {
        id: 2,
        name: "crxk",
        avatar: "https://avatars1.githubusercontent.com/u/25455350?s=96&v=4"
    },
    {
        id: 3,
        name: "pftom",
        avatar: "https://avatars0.githubusercontent.com/u/23410977?s=96&v=4"
    },
    {
        id: 4,
        name: "holy",
        avatar: "https://avatars0.githubusercontent.com/u/58352313?s=96&v=4"
    }
];