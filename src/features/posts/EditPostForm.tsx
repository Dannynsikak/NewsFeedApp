import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { postUpdated, selectPostById } from "./postsSlice";

// omit form element types
interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields;
}

const EditPostForm = () => {
  const { postId } = useParams();

  console.log("Post ID from URL:", postId); // Log postId

  const post = useAppSelector((state) => selectPostById(state, postId!));

  console.log("Selected Post:", post); // Log the post data

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!post) {
    console.log("Post not found, rendering error message."); // Log if post not found
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    // Prevent server submission
    e.preventDefault();

    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }));
      console.log("Post updated:", { id: post.id, title, content }); // Log updated post data
      navigate(`/posts/${postId}`);
    } else {
      console.log("Title or content missing, post not updated."); // Log if title or content is missing
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          defaultValue={post.title}
          required
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue={post.content}
          required
        />

        <button className="mt-[1em]">Save Post</button>
      </form>
    </section>
  );
};
export default EditPostForm;
