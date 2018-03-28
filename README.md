# Second Lunch

### What's in here?

Second Lunch is a set of tools used to create shareable social media cards. Currently, it only contains Quotable, a tool for creating quote cards.

Second Lunch is based off of NPR's [Lunchbox](https://github.com/nprapps/lunchbox), but is a complete rewrite of the technology. The goal is to package it with all the trappings of modern Javascript, and use that to create reusable components that make customization far easier.

### Development

To start developing with this repository, run the following:

```
$ npm install
$ npm run start
```

Then, visit http://localhost:3000 in your browser. You should see the page load.

### Other development commands

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

