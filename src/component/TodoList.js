import { useContext, useMemo, useState } from "react";
import { TodoStateContext } from "../App";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const todo = useContext(TodoStateContext);
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
  const analyzeTodo = useMemo(() => {
    //불필요한 호출 방지
    console.log("analyzeTodo 함수 호출");
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length; //완료
    const notDoneCount = totalCount - doneCount; //미완료
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <div className="TodoList">
      <div className="TodoCount">
        <div>Total: {totalCount}</div>
        <div>Done: {doneCount}</div>
        <div className="Undone">Undone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="Search"
      />
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem key={it.id} {...it} />
          // 리스트 형태 반복적으로 렌더링하려면 key props에 전달해야함
        ))}
      </div>
    </div>
  );
};

export default TodoList;
