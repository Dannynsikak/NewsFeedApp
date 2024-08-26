import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { selectAllPosts } from "./postsSlice";
// import { ReactionButtons } from "./ReactionButtons";
// import PostAuthor from "./PostAuthor";

const PostList = () => {
  // Select the state.post value from the store into the component
  const posts = useAppSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3 className="">
        <Link className="no-underline" to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <section className="space-y-3 posts-list">
      <h2 className="text-center text-[2rem] font-bold">Posts</h2>
      {renderedPosts}
      {/* <PostAuthor userId={} /> */}
      {/* <ReactionButtons post={posts} /> */}
    </section>
  );
};
export default PostList;
