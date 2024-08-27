import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllPosts, fetchPosts, selectPostsStatus } from "./postsSlice";
import { TimeAgo } from "../../components/TimeAgo";
import PostAuthor from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";

// import { ReactionButtons } from "./ReactionButtons";
// import PostAuthor from "./PostAuthor";

const PostList = () => {
  // Select the state.post value from the store into the component
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(selectPostsStatus);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
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
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
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
