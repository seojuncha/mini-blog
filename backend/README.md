## Backend Part

## How to run
```shell
$ npm run dev
```

## Contents Management
```
Level 1.
Anonymous User -> <contents> -> Server -> <contents> -> Database

```

## How to implement?
The first, define blog contents APIs with Swagger.

Why Swagger first?
- Convinient for testing!


## Database
user
- devuser/devuser123
```shell
postgres=# create user devuser with password 'devuser123';
```

database
- miniblog
```shell
postgres=# create database miniblog owner devuser;
```

connetion
```shell
postgresql://devuser:devuser123@localhost:5432/miniblog
```


Use prisma
- Problems
  - Doesn't migrate!

- Solutions
On database server
```shell
$ sudo -u postgresql psql
postgres=# alter user devuser createdb;
postgres=# \du
```

On express server
```shell
$ npx prisma migrate dev --name {historical name}
```

## NOTE
- Define minimum requirements
- Define APIs and database schema
- What is the maximum size of a content?
- How to create a random id for a content? 
  - Random generated unique id: Use 'nanoid' module