import Home from "../features/home/Home";
import Login from "../features/login/Login";
import Posts from "../features/posts/Posts";
import Signup from "../features/signup/Signup";
import NewPostForm from "../features/posts/NewPostForm";
import RandomPosts from "../features/posts/RandomPosts";
import UserProfile from "../features/user/UserProfile";
import UpdateUserProfile from "../features/user/UpdateUserProfile";
import DeletePost from "../features/posts/DeletePost.js";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
  {
    path: "/",
    exact: true,
    component: Posts,
  },
  {
    path: "/newPost",
    exact: false,
    component: NewPostForm,
  },
  {
    path: "/user/:username",
    exact: false,
    component: UserProfile,
  },
  {
    path: "/post/:postId",
    exact: false,
    component: DeletePost,
  },
  {
    path: "/update",
    exact: false,
    component: UpdateUserProfile,
  },
  {
    path: "/explore",
    exact: false,
    component: RandomPosts,
  },
];

const LOGGED_OUT_NO_LAYOUT_ROUTES = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/signup",
    exact: false,
    component: Signup,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
  },
];

export { LOGGED_IN_DEFAULT_LAYOUT_ROUTES, LOGGED_OUT_NO_LAYOUT_ROUTES };
