import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../../Redux/Posts/postsSlice";
import { RootState } from "../../Redux/Posts/store";

export interface DataItem {
  userId: number | string;
  id: number | string;
  title: string;
  body: string;
}

export interface AppState {
    loading: boolean;
    users: DataItem[];
    error: string | null;
}

const Home = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostsRequest());
      try {
        const response = await axios.get<DataItem[]>("https://jsonplaceholder.typicode.com/posts");
        dispatch(fetchPostsSuccess(response.data));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          dispatch(fetchPostsFailure(`Error: ${error.response.status} - ${error.response.statusText}`));
        } else if (error instanceof Error) {
          dispatch(fetchPostsFailure(error.message));
        } else {
          dispatch(fetchPostsFailure("An unknown error occurred"));
        }
      }
    };

    if (!users.length) {
      fetchPosts();
    }
  }, [dispatch, users.length]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <div className="add-post-fixed"><Link to="/add">+</Link></div>
      {loading && <p className="loading">Data is loading...</p>}
      {users.length > 0 ? (
        <div className="posts-container">
          <p className="posts-count">There are {users.length} posts to read...</p>
          <ul>
            {users.map((post: DataItem, index: number) => (
              <li className="post" key={index}>
                <div className="post-header">
                  <h2>{post.title}</h2>
                  <p>User id: {post.userId}</p>
                </div>
                <p className="post-body">{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="posts-container">There are no posts to show</div>
      )}
    </div>
  );
};

export default Home;
