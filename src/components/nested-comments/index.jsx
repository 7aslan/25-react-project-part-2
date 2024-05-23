import { useState } from "react";
import Comment from "./comment";
import "./nested-comments.css";

function NestedComments() {
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      title: "This is the first comment",
      children: [
        {
          id: 2,
          title: "This is the child comment 1",
          children: [
            {
              id: 5,
              title: "This is a sub child of comment id 2",
              children: [],
            },
          ],
        },
        {
          id: 3,
          title: "THis is the child comment 2",
          children: [],
        },
        {
          id: 4,
          title: "THis is the child comment 3",
          children: [],
        },
      ],
    },
  ]);

  function handleAddReply(getCurrentParentId, getCurrentReply) {
    let updatedComments = [...comments];
    handleAddNewComment(updatedComments, getCurrentParentId, getCurrentReply);
    setComments(updatedComments);
  }

  function newComment(text) {
    return {
      id: new Date().getTime(),
      title: text,
      children: [],
    };
  }

  function handleAddNewComment(
    updatedComments,
    getCurrentParentId,
    getCurrentReply
  ) {
    for (let i = 0; i < updatedComments.length; i++) {
      let comment = updatedComments[i];
      if (comment.id === getCurrentParentId) {
        comment.children.unshift(newComment(getCurrentReply));
      }
    }

    for (let i = 0; i < updatedComments.length; i++) {
      let comment = updatedComments[i];
      handleAddNewComment(
        comment.children,
        getCurrentParentId,
        getCurrentReply
      );
    }
  }

  return (
    <div className="nested-comments-container">
      <h1>Nested Comments</h1>
      <div className="comment-wrapper">
        <textarea
          onChange={(event) => setInputValue(event.target.value)}
          rows={"5"}
          cols={"100"}
          value={inputValue}
        ></textarea>
        <br />
        <button
          onClick={() => {
            setComments([newComment(inputValue), ...comments]);
            setInputValue("");
          }}
          className="add-comment-btn"
        >
          Add Comment
        </button>
      </div>
      <ul>
        {comments.map((comment) => (
          <Comment
            handleAddReply={handleAddReply}
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
    </div>
  );
}
export default NestedComments;
