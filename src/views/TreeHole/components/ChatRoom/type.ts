export interface ICommentListItem {
    message: {
        type: string,
        value: any
    },
    username: string,
    useruuid: string,
    avatar: string,
    callback?: string
}