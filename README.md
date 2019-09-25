# Datalyst
cross platform dbms

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
