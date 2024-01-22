import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser, fetchUserPosts } from "../../store/slices/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/users";

export default function UserPage() {
    const { userId } = useParams<{ userId: string }>()
    const navigate = useNavigate()
    const {
        userPosts,
        user,
        postsFetchStatus,
        userFetchStatus
    } = useSelector((state: RootState) => state.users)
    const dispatch = useDispatch<any>()

    const imageSrc = `https://api.slingacademy.com/public/sample-photos/${userId}.jpeg`

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if(user) {
            dispatch(fetchUserPosts(userId));
        }
    }, [dispatch, user, userId])

    if (userFetchStatus === 'loading') {
        return <div className="text-center">Loading...</div>;
    }

    if (!user || userFetchStatus === 'error') return <p className="text-center">Error loading</p>

    const renderPosts = () => {
        if (postsFetchStatus === 'loading') return <p className="text-center">Loading posts ...</p>
        if (userPosts.length === 0) return <p className="text-center">No posts found</p>


        return userPosts.map(post => (
            <div key={post.id} className="mb-2 border-b-[1px] pb-1">
                <p>post #{post.id}</p>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
            </div>
        ))
    }

    return (
        <div className="border rounded-xl p-10 shadow-xl bg-slate-50">
            <h1 className="text-center text-2xl mb-5">{user.name}</h1>
            <div className="flex justify-between items-center">
                <div>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Username: {user.username}</p>
                    <p>Website: {user.website}</p>
                    <p>Address: {user.address.city}, {user.address.street}, {user.address.suite}. Zipcode: {user.address.zipcode}</p>
                    <p>Company: {user.company.name}. {user.company.catchPhrase}</p>
                </div>
                <img className="mx-auto w-[300px]" src={imageSrc} alt=""/>
            </div>
            <h3 className="text-center text-2xl my-4">User Posts</h3>
            <div>
                {renderPosts()}
            </div>
            <button className="mt-2 border rounded-xl py-2 px-4 hover:bg-slate-200"
                    onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}
