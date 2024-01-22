import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UsersList from './index';
import {Provider} from "react-redux";
import store from "../../store";

jest.mock('../../store/slices/users', () => ({
    ...jest.requireActual('../../store/slices/users'),
    fetchUsers: jest.fn(),
    searchUser: jest.fn(),
}));

describe('UsersList component', () => {
    it('renders UsersList component correctly', () => {
        render(<Provider store={store}><UsersList /></Provider>);

        expect(screen.getByText('Search:')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter user name or email')).toBeInTheDocument();
        expect(screen.getByText('Users list')).toBeInTheDocument();
    })

    it('renders "No users found" when no users match search criteria', async () => {
        render(<Provider store={store}><UsersList /></Provider>);

        expect(screen.getByText('No users found')).toBeInTheDocument();
    });

    it('renders users correctly after API call', async () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        ];

        jest.mock('react-redux', () => ({
            ...jest.requireActual('react-redux'),
            useSelector: jest.fn(),
        }));


        render(<Provider store={store}><UsersList /></Provider>);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        });
    });

    it('filters users based on search criteria', async () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        ];

        jest.mock('../../store/slices/users', () => ({
            ...jest.requireActual('../../store/slices/users'),
            useSelector: jest.fn(fn => fn({ users: { allUsers: mockUsers, usersFetchStatus: 'loading', searchUserText: 'John' } })),
        }));

        render(<Provider store={store}><UsersList /></Provider>);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
        });
    });
});
