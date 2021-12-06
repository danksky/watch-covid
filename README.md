Hi, it's so nice of you to read me!

## Covid Map

The live version of this project can be found at [WatchCovid.org](WatchCovid.org).

This project aims to make the global impact of COVID-19 readily accessible.

The instructions for how to create the realtime chloropleth map component are on my blog [my blog](https://blog.danielkawalsky.com/post/how-to-map-covid-19-case-data). The repository which houses the final product of this component is [here](https://github.com/danksky/map-covid-tutorial).

## Scripts

### Run

To run this project locally:

```console
# Change directory to root folder of this project
npm install
npm start
```

then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

To build a production-ready version of this app:

```console
$ npm run build
```

and see the built version of this app in the `build` folder.

### Deploy

I am using Firebase to deploy this application. I have already created a Firebase project called `map-covid-2019`, so I simply need to run:

```
$ firebase deploy
```

from the root directory of this project, and, when prompted, type `build` to specify which folder I would like to serve.
