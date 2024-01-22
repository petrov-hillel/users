import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/users";

const UserDetail: React.FC<User> = ({ id, name, email }) => {
    return (
        <div className="py-2 border-b-2">
            <Link to={`/users/${id}`}>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
            </Link>

        </div>
    );
};

export default UserDetail;
