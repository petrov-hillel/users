import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUser } from "../../store/slices/users";
import { RootState, User } from "../../types/users";
import UserDetail from "../UserDetail";

export default function UsersList() {
    const { allUsers = [], usersFetchStatus, searchUserText = ''} = useSelector((state: RootState) => state.users);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const searchHandler = (event: { target: HTMLInputElement; }) => {
        dispatch(searchUser(event.target.value))
    }

    if (usersFetchStatus === 'error') return <p className="text-center">Error loading</p>

    const filteredUsers = allUsers.filter(({ name, email }: { name: string, email: string }) =>
        name.toLowerCase().includes(searchUserText.toLowerCase()) || email.toLowerCase().includes(searchUserText.toLowerCase())
    )

    return (
        <div className="border rounded-xl p-10 shadow-xl bg-slate-50">
            <header className="border-b-2 pb-4 mb-4">
                <label htmlFor="text">Search: </label>
                <input type="text"
                       id="text"
                       onChange={searchHandler}
                       value={searchUserText}
                       placeholder="Enter user name or email"
                       className="py-1 px-3 border rounded w-52"
                />
            </header>
            <h2 className="text-2xl text-center mb-4">Users list</h2>
            {usersFetchStatus === 'loading'
                ? (<div className="text-center">Loading users ...</div>)
                : (filteredUsers.map((users: User) => (
                    <UserDetail key={users.id} {...users} />
            )))}
            {filteredUsers.length === 0 && (<div>No users found</div>)}
        </div>
    );
}
