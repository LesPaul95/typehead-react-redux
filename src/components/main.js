import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SearchPage from '../containers/SearchPage.js';

export const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={SearchPage} />
                <Route path='/search' component={SearchPage} />
            </Switch>
        </div>
    )
}