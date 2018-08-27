import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SearchPage from './containers/SearchPage.js';

import './main.less';

const STATUS = {
    IDLE: 1,
    PENDING: 2,
    SUCCESS: 3
};

const initialState = {
    searchValue: "",
    images: {
        data: [],
        status: STATUS.IDLE
    },
    isLoading: true,
    notebook: false,
    laptop: false,
    
}

const reducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case "SEARCH_IMAGES_START":
            newState.isLoading = true;
            newState.images = {
                data: [],
                status: STATUS.PENDING
            };
            break;
        case "SEARCH_IMAGES_SUCCESS":
            newState.isLoading = false;
            newState.images = {
                data: action.payload,
                status: STATUS.SUCCESS
            };
            break;
        case "SEARCH_IMAGES_FAILURE":
            newState.isLoading = false;
            newState.isError = true;
            break;
    }

    return newState;
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <SearchPage />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);