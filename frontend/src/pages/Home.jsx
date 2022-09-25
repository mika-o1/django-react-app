import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as bases from "../components/bases"
import * as paginators from "../components/paginators"

export const DEBUG = true;

export const ALL_MESSAGE_LOAD = "ALL_MESSAGE_LOAD";
export const ALL_MESSAGE_DATA = "ALL_MESSAGE_DATA";
export const ALL_MESSAGE_ERROR = "ALL_MESSAGE_ERROR";
export const ALL_MESSAGE_FAIL = "ALL_MESSAGE_FAIL";
export const ALL_MESSAGE_RESET = "ALL_MESSAGE_RESET";

export function GetAllMessageReducer (state = {}, action = null) {
  switch (action.type) {
    case ALL_MESSAGE_LOAD:
      return { load: true };
    case ALL_MESSAGE_DATA:
      return { load: false, data: action.payload };
    case ALL_MESSAGE_ERROR:
      return { error: "ошибка на сервере" };
    case ALL_MESSAGE_FAIL:
      return { fail: "ошибка на клиенте" };
    case ALL_MESSAGE_RESET:
      return {};
    default:
      return state;
  }
}

export const GetAllMessageAction = (page, limit) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_MESSAGE_LOAD,
    });

    // const { ReduxExampleStore: ReduxExampleStore } = getState();

    const config = {
      "method": "GET",
      timeout: 5000,
      url: `/api/chat/?page=${page}&limit=${limit}`,
      data: null,
    };
    const response = await axios(config);

    const { data } = response;
    if (data) {
      dispatch({
        type: ALL_MESSAGE_DATA,
        payload: data,
      });
    } else {
      dispatch({
        type: ALL_MESSAGE_ERROR,
        payload: data,
      });
    }
  } catch (error) {
    if(DEBUG){
      console.log(error);
    }
    dispatch({
      type: ALL_MESSAGE_FAIL,
      payload: error,
    });
  }
};


export function Home() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [text, setText] = useState('');

  function getAllMessage() {
    if (!load) {
      dispatch(GetAllMessageAction(page, limit));
    } else {
        console.log("Предыдущий запрос ещё в обработке!")
    }
  }

  function resetAllMessage() {
    dispatch({
      type: ALL_MESSAGE_RESET,
    });
  }
  
  async function sendMessage() {
    const formData = new FormData();
    formData.append("text", text);
    const config = {
      method: "POST",
      timeout: 5000,
      url: `/api/chat/`,
      data: formData,
    };
    const response = await axios(config);
    console.log(`response: ${response}`)
    setText('')
    getAllMessage()
  }

  const GetUsersStore = useSelector((state) => state.GetUsersStore);
  const {
    load: load,
    data: data,
    error: error,
    fail: fail,
    reset: reset,
  } = GetUsersStore;

  useEffect(() => {
    console.log(`load: ${load}`);
    console.log(`data: ${data}`);
    console.log(`error: ${error}`);
    console.log(`fail: ${fail}`);
    console.log(`reset: ${reset}`);
  }, [GetUsersStore]);

  useEffect(() => {
    dispatch(GetAllMessageAction(page, limit));
  }, [page]);

  return (
    <bases.Base1>
      <main className="custom_main p-0 m-0 w-100">
        {load ? <div>Идёт загрузка...</div> : <div></div>}
        {error ? <div>Ошибка 1</div> : <div></div>}
        {fail ? <div>Ошибка 2</div> : <div></div>}

        <div className="container m-2 p-2">
          <form onSubmit={(event)=>{
            event.preventDefault()
            sendMessage()
          }}>
            <label for="floatingInput">Введите сообщение</label>
            <div className="input-group">
              <input type="text" placeholder="введите сообщение сюда"
               className="form-control"
               min="1"
               max="50"
               required
               value={text}
               onChange={(event)=> setText(event.target.value)}
               />
              <button type="submit" className="btn btn-lg btn-outline-success">отправить</button>
            </div>
          </form>
        </div>

        {data ? (
          <div>
            <paginators.Paginator1 page={page} setPage={setPage} count={data["x-total-count"]} limit={limit}></paginators.Paginator1>
            <ul>
              {data["list"].map((item) => (
                <li className="text-start">{item.text}</li>
              ))}
            </ul>
            <paginators.Paginator1 page={page} setPage={setPage} count={data["count"]} limit={limit}></paginators.Paginator1>
          </div>
        ) : (
          <div></div>
        )}
        <div className="btn-group">
          <button
            onClick={getAllMessage}
            className="btn btn-lg btn-outline-primary m-1 p-1"
          >
            get
          </button>
          <button
            onClick={resetAllMessage}
            className="btn btn-lg btn-outline-secondary m-1 p-1"
          >
            reset
          </button>
        </div>
      </main>
    </bases.Base1>
  );
}
