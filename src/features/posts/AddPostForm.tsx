import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postAdded } from "./postsSlice";
import { selectCurrentUsername } from "../auth/authSlice";

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields;
}

const AddPostForm = () => {
  // Get the dispatch method from the store
  const dispatch = useAppDispatch();
  // Get the currently logged-in user's username from the auth slice
  const userId = useAppSelector(selectCurrentUsername);

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    // Prevent server submission
    e.preventDefault();

    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;

    // Dispatch the postAdded action with the logged-in user's ID
    dispatch(postAdded(title, content, userId!));

    console.log("Post added with values:", { title, content, userId });
    e.currentTarget.reset();
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button className="mt-[.5em]">Save Post</button>
      </form>
    </section>
  );
};

export default AddPostForm;
