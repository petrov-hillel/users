export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    username: string;
    website: string;
    address: Address;
    company: Company;
};


export type SliceState = {
    allUsers: User[];
    usersFetchStatus: 'pending' | 'loading' | 'error';
    user: User | null;
    userFetchStatus: 'pending' | 'loading' | 'error';
    userPosts: Post[];
    postsFetchStatus: 'pending' | 'loading' | 'error';
    searchUserText: string
}

export type RootState = {
    users: SliceState
};

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

type Geo = {
    lat: string
    lng: string
}
type Address = {
    city: string
    street: string
    suite: string
    zipcode: string
    geo: Geo
}
type Company = {
    name: string
    catchPhrase: string
    bs: string
}
