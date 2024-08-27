import PostsList from "../posts/PostList";
import AddPostForm from "../posts/AddPostForm";

export function PostsMainPage() {
  return (
    <div>
      <AddPostForm />
      <PostsList />
    </div>
  );
}
