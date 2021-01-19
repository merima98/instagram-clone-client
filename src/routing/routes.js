import Home from "../features/home/Home";
import Login from "../features/login/Login";
import Posts from "../features/posts/Posts";
import Signup from "../features/signup/Signup";
import NewPostForm from "../features/posts/NewPostForm";

const LOGGED_IN_DEFAULT_LAYOUT_ROUTES = [
  {
    path: "/",
    exact: true,
    component: Posts,
  },
  {
    path: "/addpost",
    exact: true,
    component: NewPostForm,
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
