import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import React, { useMemo, useCallback, useReducer, useRef } from "react";

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React Study",
    createdDate: new Date().getTime(), //타임스탬프 값으로 변환 -> 보관할 데이터 양 줄어듦
  },
  {
    id: 1,
    isDone: false,
    content: "TOEIC Speacking Study",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "Write blog",
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

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []); //마운트 이후에 다시 재생성x

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
