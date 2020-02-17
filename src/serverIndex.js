import '@babel/polyfill';
import express from 'express';
import React from 'react';
import { matchRoutes } from 'react-router-config';
import serverTemplate from './serverTemplate';
import createStore from './store';
import Routes from './client/Routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore({});
    const routes = matchRoutes(Routes, req.path);
    const promises = routes
    .map(({ route }) => {
        return route.preFetchData ? route.preFetchData(store, req.path) : null;
    })
    .map(promise => {
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            });
        }
        return null;
    });

    Promise.all(promises).then(() => {
        const context = {};
        const content = serverTemplate(req, store, context);

        if (context.notFound) {
            res.status(404);
        }

        res.send(content);
    });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
