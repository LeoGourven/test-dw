# Datawrapper Test Project: Senior Data Vis Developer

This repository containing a bare-bones chart editor as a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The chart editor includes a data table for data import, and a resizeable visualization preview.

The imported data gets parsed and made available as a Datawrapper `dataset` object, using the publicly available utility functions at [datawrapper/datawrapper](https://github.com/datawrapper/datawrapper), which have been included in this repository in `app/lib/datawrapper`.

This repository will serve as the starting point for the hiring assignment.

## Start here

To start developing on this project, set it up as follows:

1. Clone this repository
    ```bash
    git clone  git@github.com:datawrapper/vis-hiring-assignment-react.git
    ```
2. Install dependencies and build lib files
    ```bash
    cd datawrapper-vis-hiring-assignment-react
    npm run install-deps
    ```

## Developing the project

Once you've created a project and installed dependencies with `npm run install-deps`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Open http://localhost:3500 with your browser to see the app.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run start`.
