import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectPostById } from "./postsSlice";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { TimeAgo } from "../../components/TimeAgo";
import PostAuthor from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";

const ViewPost = () => {
  const { postId } = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId!));
  const currentUsername = useAppSelector(selectCurrentUsername)!;

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  const canEdit = currentUsername === post.user;

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        {canEdit && (
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        )}
      </article>
    </section>
  );
};
export default ViewPost;
