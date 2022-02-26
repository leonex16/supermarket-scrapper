# supermarket-scrapper-front

## Conventional Commits

- **init:** First commit of the project.

- **finish:** Last commit of the project.

- **fix:** A commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).

- **feat:** A commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).

- **BREAKING CHANGE:** A commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.

- **style:** Improve structure / format of the code.

- **refactor:** Refactor code.

- **docs:** Add or update documentation.

### Examples

a. **Commit message with description and breaking change footer**

    feat: allow provided config object to extend other configs

    BREAKING CHANGE: `extends` key in config file is now used for extending other config files

b. **Commit message with ! to draw attention to breaking change**

    feat!: send an email to the customer when a product is shipped

c. **Commit message with scope and ! to draw attention to breaking change**

    feat(api)!: send an email to the customer when a product is shipped

d. **Commit message with both ! and BREAKING CHANGE footer**

    chore!: drop support for Node 6

    BREAKING CHANGE: use JavaScript features not available in Node 6.

e. **Commit message with no body**

    docs: correct spelling of CHANGELOG

f. **Commit message with scope**

    feat(lang): add polish language

g. **Commit message with multi-paragraph body and multiple footers**

    fix: prevent racing of requests

    Introduce a request id and a reference to latest request. Dismiss
    incoming responses other than from latest request.

    Remove timeouts which were used to mitigate the racing issue but are
    obsolete now.

    Reviewed-by: Z
    Refs: #123

## Setup gitmoji

```npm run commit```


### Emoji for type commit

| Commit Type     | Emoji Code | Emoji |
| --------------- | ---------- | ----- |
| fix             | :bug:      | 🐛    |
| feat            | :sparkles: | ⚡️   |
| BREAKING CHANGE | :boom:     | 💥    |
| style           | :art:      | 🎨    |
| refactor        | :recycle:  | ♻️    |
| init            | :tada:     | 🎉    |
| finish          | :rocket:   | 🚀    |
| docs            | :memo:     | 📝    |
| arch | :building_construction: | | 

