import { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearchResult = () => {
    return search === "" //빈 문자열이면 그대로 반환
      ? todo //그렇지 않으면 일치한 아이템만 필터링해서 반환
      : todo.filter(
          (it) => it.content.toLowerCase().includes(search.toLowerCase()) //대소문자 구별 X
        );
  };

  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요"
      />
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem
            key={it.id}
            {...it}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          // 리스트 형태 반복적으로 렌더링하려면 key props에 전달해야함
        ))}
      </div>
    </div>
  );
};

export default TodoList;
