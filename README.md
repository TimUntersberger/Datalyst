# Datalyst
cross platform dbms

## TODO

* Add support for keyboard based search functionality for tables, connections, ...
* Change the ui to a more useable and less aesthetical layout
* Finish postgres adapter
* Write tests for postgres adapter (well more like write tests for the adapter api)
* Include code editor for displaying functions and editing them. (Without autocomplete)
* Try to find a way to support a custom autocomplete engine (Maybe use/create a language server)

## Development

* `npm install`
* `npm run watch` in one terminal tab and `npm run main:start` in another tab.

If you want to develop only the database driver then only use `npm run lib:dev`.
You can write "tests" in the lib.ts file.

## Scripts

### watch

Runs the main:watch and renderer:watch script in parallel

### main

##### watch

Starts parcel with target electron on the main folder in src

##### start

Runs nodemon on the built files of main.

### renderer

##### watch

Starts parcel on the renderer folder in src

### lib

##### dev

Watches the src/main/lib.ts file and compiles automatically when a file is changed and then runs the program.
