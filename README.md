# supermarket-scrapper-front

## setup project 

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

## JSDoc

### Supported Tags

| Tag          | Description                                                                                  |
|--------------|----------------------------------------------------------------------------------------------|
| @abstract    | This method can be implemented (or overridden) by the inheritor.                             |
| @access      | Specify the access level of this member (private, public, or protected).                     |
| @alias       | Treat a member as if it had a different name.                                                |
| @augments    | This class inherits from a parent class.                                                     |
| @author      | Identify the author of an item.                                                              |
| @borrows     | This object uses something from another object.                                              |
| @callback    | Document a callback function.                                                                |
| @class       | This function is a class constructor.                                                        |
| @classdesc   | Use the following text to describe the entire class.                                         |
| @constant    | Document an object as a constant.                                                            |
| @constructs  | This function member will be the constructor for the previous class.                         |
| @copyright   | Document some copyright information.                                                         |
| @default     | Document the default value.                                                                  |
| @deprecated  | Document that this is no longer the preferred way.                                           |
| @description | Describe a symbol.                                                                           |
| @enum        | Document a collection of related properties.                                                 |
| @event       | Document an event.                                                                           |
| @example     | Provide an example of how to use a documented item.                                          |
| @exports     | Identify the member that is exported by a JavaScript module.                                 |
| @external    | Document an external class/namespace/module.                                                 |
| @file        | Describe a file.                                                                             |
| @fires       | Describe the events this method may fire.                                                    |
| @function    | Describe a function or method.                                                               |
| @global      | Document a global object.                                                                    |
| @ignore      | [todo] Remove this from the final output.                                                    |
| @inner       | Document an inner object.                                                                    |
| @instance    | Document an instance member.                                                                 |
| @kind        | What kind of symbol is this?                                                                 |
| @lends       | Document properties on an object literal as if they belonged to a symbol with a given name.  |
| @license     | [todo] Document the software license that applies to this code.                              |
| @link        | Inline tag – create a link.                                                                  |
| @member      | Document a member.                                                                           |
| @memberof    | This symbol belongs to a parent symbol.                                                      |
| @mixes       | This object mixes in all the members from another object.                                    |
| @mixin       | Document a mixin object.                                                                     |
| @module      | Document a JavaScript module.                                                                |
| @name        | Document the name of an object.                                                              |
| @namespace   | Document a namespace object.                                                                 |
| @param       | Document the parameter to a function.                                                        |
| @private     | This symbol is meant to be private.                                                          |
| @property    | Document a property of an object.                                                            |
| @protected   | This member is meant to be protected.                                                        |
| @public      | This symbol is meant to be public.                                                           |
| @readonly    | This symbol is meant to be read-only.                                                        |
| @requires    | This file requires a JavaScript module.                                                      |
| @return      | Document the return value of a function.                                                     |
| @see         | Refer to some other documentation for more information.                                      |
| @since       | Documents the version at which the function was added, or when significant changes are made. |
| @static      | Document a static member.                                                                    |
| @this        | What does the ‘this’ keyword refer to here?                                                  |
| @throws      | Describe what errors could be thrown.                                                        |
| @todo        | Document tasks to be completed.                                                              |
| @tutorial    | Insert a link to an included tutorial file.                                                  |
| @type        | Document the type of an object.                                                              |
| @typedef     | Document a custom type.                                                                      |
| @variation   | Distinguish different objects with the same name.                                            |
| @version     | Documents the version number of an item.                                                     |
| @yield       | Document the yielded values of a generator function.                                         |

### Unsupported Tags

| Tag           | Description                                                                                 |
|---------------|---------------------------------------------------------------------------------------------|
| @summary      | Should not be used. See the example of how to separate a summary from the full description. |
| @virtual      | An unsupported synonym. Use @abstract instead.                                              |
| @extends      | An unsupported synonym. Use @augments instead.                                              |
| @constructor  | An unsupported synonym. Use @class instead.                                                 |
| @const        | An unsupported synonym. Use @constant instead.                                              |
| @defaultvalue | An unsupported synonym. Use @default instead.                                               |
| @desc         | An unsupported synonym. Use @description instead.                                           |
| @host         | An unsupported synonym. Use @external instead.                                              |
| @fileoverview | An unsupported synonym. Use @file instead.                                                  |
| @overview     | An unsupported synonym. Use @file instead.                                                  |
| @emits        | An unsupported synonym. Use @fires instead.                                                 |
| @func         | An unsupported synonym. Use @function instead.                                              |
| @method       | An unsupported synonym. Use @function instead.                                              |
| @var          | An unsupported synonym. Use @member instead.                                                |
| @emits        | An unsupported synonym. Use @fires instead.                                                 |
| @arg          | An unsupported synonym. Use @param instead.                                                 |
| @argument     | An unsupported synonym. Use @param instead.                                                 |
| @prop         | An unsupported synonym. Use @property instead.                                              |
| @returns      | An unsupported synonym. Use @return instead.                                                |
| @exception    | An unsupported synonym. Use @throws instead.                                                |