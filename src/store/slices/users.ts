import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getAllUsers, getUserData, getUserPosts} from "../../utils/axios";
import {SliceState} from "../../types/users";

const initialState: SliceState = {
    allUsers: [],
    usersFetchStatus: 'pending',
    user: null,
    userFetchStatus: 'pending',
    userPosts: [],
    postsFetchStatus: 'pending',
    searchUserText: '',
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await getAllUsers();
    },
);

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (id: string | undefined) => {
        return await getUserData(id);
    },
);

export const fetchUserPosts = createAsyncThunk(
    'users/fetchUserPosts',
    async (id: string | undefined) => {
        return await getUserPosts(id);
    },
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.searchUserText = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.usersFetchStatus = 'loading';
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.usersFetchStatus = 'error';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersFetchStatus = 'pending';
                state.allUsers = action.payload;
            })

            .addCase(fetchUser.pending, (state) => {
                state.userFetchStatus = 'loading';
            })
            .addCase(fetchUser.rejected, (state) => {
                state.userFetchStatus = 'error';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userFetchStatus = 'pending';
                state.user = action.payload;
            })

            .addCase(fetchUserPosts.pending, (state) => {
                state.postsFetchStatus = 'loading';
            })
            .addCase(fetchUserPosts.rejected, (state) => {
                state.postsFetchStatus = 'error';
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.postsFetchStatus = 'pending';
                state.userPosts = action.payload;
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = usersSlice;
export const { searchUser } = actions
export default reducer;
