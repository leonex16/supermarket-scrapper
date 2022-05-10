# supermarket-scrapper-front

## Setup Project

` npm install --force `

## Conventional Commits

- **init:** First commit of the project.

- **finish:** Last commit of the project.

- **fix:** A commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).

- **feat:** A commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).

- **build:** Add, update, or remove feature flags. Not to be counfoused with :feat:, this emoji shoud be used while creating and developing the new feature, and :feat: when this new feature is ready to be merge into the main branch.

- **BREAKING CHANGE:** A commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.

- **style:** Improve structure / format of the code.

- **refactor:** Refactor code.

- **docs:** Add or update documentation.

- **arch:** Architecture change.

- **package:** Add or update a library or package.

- **wrench:** Add or update configuration files.

- **test_tube:** Add, update, or pass tests.

## Create a commit

```npm run commit```

### Emoji for type commit

| Commit Type     | Emoji                        |
|-----------------|------------------------------|
| fix             | :bug:                        |
| feat            | :sparkles:                   |
| BREAKING CHANGE | :boom:                       |
| style           | :art:                        |
| refactor        | :recycle:                    |
| init            | :tada:                       |
| finish          | :rocket:                     |
| docs            | :memo:                       |
| arch            | :building_construction:      |
| build           | :triangular_flag_on_post:    |
| package         | :package:                    |
| config          | :wrench:                     |
| test            | :test_tube:                  |

## Dependency Configuration

## Nodemon

Nodemon is a development tool that we have used to observe changes in typescript files.

Sincewe use typescript, nodemon requires habing ts-node installed as a dependency.

Ts-node, on each run, looks for the TS_NODE_PROJECT environment variable, which specefies the relative path of tsconfig file.

This following command helps us to run nodemon with ts-node in a specefic layer, like Domain or Infrastructure.

```bash
TS_NODE_PROJECT=./tsconfig.json nodemon --exec ts-node --pretty ./apps/index.ts
```

### Module alias

Library for create path aliases voiding relative path.
For it to work properly, you must create the aliases in the main package.json, and, for each environment, specific the correspondly path.

Ex:q

I want create two route aliases, for Domain layer and Infrastucture layer.

- Development

  ```json
  {
    "_moduleAliases": {
      "@Domain": "src/Domain",
      "@Infrastructure": "src/Infrastructure"
    }
  }
  ```

- Production

  ```json
  {
    "_moduleAliases": {
      "@Domain": "dist/Domain",
      "@Infrastructure": "dist/Infrastructure"
    }
  }
  ```
  
Prerequisites npm i -D jest typescript yarn add --dev jest typescript
Installing npm i -D ts-jest @types/jest yarn add --dev ts-jest @types/jest
Creating config npx ts-jest config:init
