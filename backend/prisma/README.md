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


### ORM: prisma
Useful commands
```shell
## Migration
# mini-blog/backend/
$ npx prisma migrate reset
$ npx prisma migrade dev --name {name}
```

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

### Modeling
Technical Considerations:
- Throughput of creating post
- Multiple Users?
- Reading speed (database/api)
- Huge contents?

**Tables and attributes:**
- User
  - id (pk)
  - name
  - email (unique)
- Post
  - id (pk)
  - title
  - summary (nullable)
  - content
  - author id (fk: User-id)
  - create date (default: now)
  - update date (default: create date)
- Comment
  - id (pk)
  - user id (fk: User-id)
  - linked post id (fk: Post-id)
  - parent comment id (fk: Comment-id) (nullable)
  - content
  - create date (default: now)
- Tag
  - id (pk)
  - name
  - linked post id (fk: Post-id)
- PostTag
  - post id (fk: Post-id)
  - tag id (fk: Tag-id)

**Relations**
- User : Post = 1:N
- User : Comment = 1:N
- Post : Comment = 1:N
- Post : Tag = N:M


**dbdiagram.io**
```
Table User {
  id int [pk, increment]
  public_id varchar [unique, note: "12-char public ID"]
  name varchar
  email varchar [unique]
}

Table Post {
  id int [pk, increment]
  public_id varchar [unique, note: "12-char public ID"]
  title varchar
  summary text [note: "nullable"]
  content text
  author_id int [ref: > User.id]
  create_date datetime [default: `now()`]
  update_date datetime [default: `now()`]
}

Table Comment {
  id int [pk, increment]
  public_id varchar [unique, note: "12-char public ID"]
  user_id int [ref: > User.id]
  post_id int [ref: > Post.id]
  parent_comment_id int [ref: > Comment.id, note: "nullable"]
  content text
  create_date datetime [default: `now()`]
}

Table Tag {
  id int [pk, increment]
  public_id varchar [unique, note: "12-char public ID"]
  name varchar [unique]
}

Table PostTag {
  post_id int [ref: > Post.id]
  tag_id int [ref: > Tag.id]
  Note: "Composite Key"
}
```