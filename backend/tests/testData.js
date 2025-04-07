import { nanoid } from "nanoid";

export const testUserData = [
  {
    publicId: nanoid(12),
    name: "test user 1",
    email: "testuser1@email.com",
    password: "iamtester",
  },
  {
    publicId: nanoid(12),
    name: "test user 2",
    email: "testuser2@email.com",
    password: "iamtester",
  },
  {
    publicId: nanoid(12),
    name: "error user 2",
    email: "testuser2@email.com", // same email with test user 2
    password: "iamtester",
  },
];

export const testFivePostsData = [
  { title: "title 1", content: "content 1" },
  { title: "title 2", content: "content 2" },
  { title: "title 3", content: "content 3" },
  { title: "title 4", content: "content 4" },
  { title: "title 5", content: "content 5" },
];

export const test15PostsData = [
  { title: "title 1", content: "content 1" },
  { title: "title 2", content: "content 2" },
  { title: "title 3", content: "content 3" },
  { title: "title 4", content: "content 4" },
  { title: "title 5", content: "content 5" },

  { title: "title 6", content: "content 6" },
  { title: "title 7", content: "content 7" },
  { title: "title 8", content: "content 8" },
  { title: "title 9", content: "content 9" },
  { title: "title 10", content: "content 10" },

  { title: "title 11", content: "content 11" },
  { title: "title 12", content: "content 12" },
  { title: "title 13", content: "content 13" },
  { title: "title 14", content: "content 14" },
  { title: "title 15", content: "content 15" },
];
