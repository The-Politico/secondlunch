# simple-bundler prototype

### Development

To start developing with this repository, run the following:

```
$ npm install
$ npm run start
```

Then, visit http://localhost:3000 in your browser. You should see the page load.

### Other development commands

##### Develop with API server

```
$ npm run start:api
```

##### Build to `dist/`

```
$ npm run build
```

##### Build to `docs/` for publishing as GitHub page

```
$ npm run build:gitpage
```

##### Build and publish page to AWS S3 bucket

1. Make sure you have [AWS credentials stored in your user profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html).

2. Configure AWS settings in package.json.

3. Run publish command:

  ```
  $ npm run publish:aws
  ```
