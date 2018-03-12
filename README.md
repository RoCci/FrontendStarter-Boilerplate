# Frontend Boilerplate

## Requirements

- Node 6 LTS

## Initialization

### Git

This repo contains the submodule express-proxy. So make sure to
init the submodule.

```
git clone --recursive
```

### Npm

Due to having a submodule, make sure to run npm install on both modules.

```
cd src/
npm install

cd express-proxy
npm install
```

## Development

### Config

Rename ```/src/.apprc.local``` to ```/src/.apprc```

### Running

Run the frontend develpment task:

```
cd src
npm run develop
```

Run the express server:

```
cd src/express-proxy
npm run develop
```

## Dev / Stage / Production

Choose the corresponding ```/src/.apprc.*``` file and rename it to ```/src/.apprc```

LOCAL: [localhost:3000](http://localhost:3000)  
