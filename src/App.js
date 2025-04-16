import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import React, { useCallback, useReducer, useRef } from "react";

export const TodoContext = React.createContext();

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(), //타임스탬프 값으로 변환 -> 보관할 데이터 양 줄어듦
  },
  {
    id: 1,
    isDone: false,
    content: "TOEIC Speacking 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "회고록 작성하기",
    createdDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  //상태 변화 로직
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId //targetId 아니라 action.targetId
          ? {
              ...it,
              isDone: !it.isDone,
            }
          : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3); //이전에 0,1,2가 있으므로 초깃값 3으로 설정
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        //추가 내용
        id: idRef.current,
        isDone: false,
        content,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  }, []);
  // const onCreate = useCallback(() => {
  //   setState((state) => [newItem, ...state]);
  // }, []);
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId, //체크 여부
    });
  }, []);
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId, //삭제할 아이템
    });
  }, []);
  // const memoizedDispatches = useMemo(() => {
  //   return { onCreate, onUpdate, onDelete };
  // }, [onCreate, onUpdate, onDelete]);

  return (
    <div className="App">
      <Header />
      <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete }}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
