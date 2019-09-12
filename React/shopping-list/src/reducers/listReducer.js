import {
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    ITEMS_LOADED,
    LOGOUT_SUCCESS,
    LIST_LOADED,
    ADD_FAIL,
    CHANGE_LIST,
    SCRAPING,
    SCRAPED,
    CREATING_LIST,
    LIST_CREATED,
    LIST_CREATION_ERROR
  } from '../action/types';

  const initialState = {
    Items: [],
    UserLists: [],
    LoadingItems: false,
    Scraping: false,
    ItemsLoaded: false,
    ListLoaded: false,
    CurrList: {
        name: "",
        id: null
    },
    Info: [],
    CreatingList: false

};

export default (state = initialState, action) => {
    switch(action.type){

        case ITEMS_LOADED:
            return {
                ...state,
                Items: action.payload,
                LoadingItems: false,
                ItemsLoaded: true
            }
        
        case ITEMS_LOADING:
            return {
                ...state,
                LoadingItems: true,
                
            }
        
        case LOGOUT_SUCCESS:
            return {
                ...state,
                Items: [],
                UserLists: [],
                currList: {name: "", id: null},
                Info: [],
                CurrList: {
                    name: "",
                    id: null
                }
            }
        
        case DELETE_ITEM:
            return {
                ...state,
                Items: state.Items.filter(item => item.id !== action.payload),
            }
        
        case ADD_ITEM:
            return {
                ...state,
                Items: [action.payload, ...state.Items]
            }
        
        case ADD_FAIL:
            return state

        case LIST_LOADED:
            return {
                ...state,
                UserLists: action.payload,
                ListLoaded: true
            }

        case CHANGE_LIST:
            return{
                ...state,
                CurrList: {
                    name: action.payload.name,
                    id:action.payload.id
                    }
            }
        
        case SCRAPING:
            return {
                ...state,
                Scraping: true,
            }
        
        case SCRAPED:
            return {
                ...state,
                Info: action.payload,
                Scraping: false,
            }

        case CREATING_LIST:
            return {
                ...state,
                CreatingList: true
            }
        
        case LIST_CREATED:
            return {
                ...state,
                CreatingList: false,
                UserLists: [action.payload, ...state.UserLists],
                CurrList: {
                    name: action.payload.name,
                    id:action.payload.id
                    }
            }

        case LIST_CREATION_ERROR:
                return {
                    ...state,
                    CreatingList: false
                }
        default:
            return state;
    }
}