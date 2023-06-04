import type { IIMG } from '@/type/TreeHole/file'
type UUID = string;

interface IUSERINFO {
    ACCOUNT: string
    AVATAR: string
}

export interface IComment {
    ACCOUNT: string;
    ADD_TIME: string;
    ARTICLE_UUID: UUID;
    AVATAR: string;
    COMMENT: string;
    PICS: IIMG[];
    COMMENT_UUID: UUID;
    FATHER_COMMENT_UUID?: UUID;
    TO_USER_UUID?: UUID;
    USER_UUID: UUID;
    USERINFO?: IUSERINFO,
}

export interface IChildComment extends Omit<IComment, 'childComment'> {
    FATHER_COMMENT_UUID: UUID;
    TO_USER_UUID: UUID;
}

export type ICommentWithChild = IComment & { childComment?: IChildComment[] };