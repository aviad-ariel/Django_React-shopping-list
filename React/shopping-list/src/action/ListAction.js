import axios from 'axios';

import {
    ADD_FAIL,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    ITEMS_LOADED,
    LIST_LOADED,
    CHANGE_LIST,
    SCRAPING,
    SCRAPED,
    CREATING_LIST,
    LIST_CREATED,
    LIST_CREATION_ERROR
  } from './types';

export const ROOT_URL = "http://localhost:8000/";

export const addList = list => dispatch => {
  dispatch({ type: CREATING_LIST });
  axios.post(ROOT_URL + "api/new_list/", list, tokenConfig())
    .then(res => {
      dispatch({
        type: LIST_CREATED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: LIST_CREATION_ERROR,
        payload: err
      })
    })
}


export const scrap = name => dispatch => {
  dispatch({ type: SCRAPING });
  axios.get(ROOT_URL + "api/scrap/"+name+"/", tokenConfig())
    .then(res => {
      dispatch({
        type: SCRAPED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: 'ERROR',
        payload: err
      })
    })
} 

export const changeList = ({name, id}) => dispatch => {
  dispatch({
    type: CHANGE_LIST,
    payload: {name, id}
  })
}

export const addItem = item => dispatch =>{
    axios.post(ROOT_URL + "api/new_item/", item, tokenConfig())
      .then(res => {
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: ADD_FAIL,
          payload: err
        })
      })
}

export const loadLists = ownerId => dispatch => {
    axios
      .get(ROOT_URL + "api/" + ownerId + "/list/", tokenConfig())
      .then(res => 
        dispatch({
            type: LIST_LOADED,
            payload: res.data
        })
      )
      .catch(err => 
        dispatch({
          type: 'ERROR',
          payload: err})
        )
}

export const loadItems = listId => dispatch => {
    dispatch({ type: ITEMS_LOADING });

    axios
      .get(ROOT_URL + "api/" + listId + "/", tokenConfig())
      .then(res => 
        dispatch({
            type: ITEMS_LOADED,
            payload: res.data
        })
      )
      .catch(err => dispatch({
        type: 'ERROR',
        payload: err
    }))
};

export const deleteItem = itemId => dispatch => {
    axios
      .delete(ROOT_URL + "api/" + itemId + "/delete_item", tokenConfig())
      .then(res => dispatch({
              type: DELETE_ITEM,
              payload: itemId
          })
        )
        .catch(err => dispatch({
            type: 'ERROR',
            payload: err
        }))
      };


export const tokenConfig = () => {
    const token = localStorage.getItem("Token");
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = 'token ' + token;
    }
    return config;
};