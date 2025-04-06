## Backend Part

Run this server for development only now.
```shell
$ npm run dev
```

### Implement Progress
Step 1. (Done)
- Configure directory and code structure
- Attach Swagger
- Check Points
  - Route working
  - Database connection

Step 2. (Done)
- Database modelling
- Define prisma schema
- Migrating

Step 3. (Done)
- Create basic controllers
- Check read/write performance for database
  - Write a test code
  - Summary test results

Step 4.
- Create APIs
  - Define route path
  - Define error codes and messages
- Connect APIs with controllers

Step 5.
- Create middlewares
- Session control
- Authentication & Authorize
- Error handling

Step 6. 
- Add features

### Implmentation Note

#### Session Management

#### Data Control

### Ideas
- Can I use this as a common contents writing backend service?
- Apply commit/push rule to write a swagger docs forcibly. Automatically, check route paths and swagger yaml.

### NOTE
- Define minimum requirements
- Define APIs and database schema
- What is the maximum size of a content?
- How to create a random id for a content? 
  - Random generated unique id: Use 'nanoid' module

## References
- 