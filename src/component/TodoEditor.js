import "./TodoEditor.css";
import { useContext, useState, useRef } from "react";
import { TodoDispatchContext } from "../App";

const TodoEditor = () => {
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      //빈 입력 방지
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent(""); //입력 폼 초기화
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      //엔터키 13번
      onSubmit(); //엔터키 추가
    }
  };

  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기✏</h4>
      <div className="editor_wrapper">
        <input
          ref={inputRef}
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          placeholder="새로운 Todo 작성하기"
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
