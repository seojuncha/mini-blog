import { Prisma } from "@prisma/client";
import { Store } from "express-session";

class PrismaSessionStore extends Store {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async destroy(sid, callback) {
    console.log("destory prisma session store");
    return null;
  }

  async get(sid, callback) {
    console.log("get prisma session store");
    return null;
  }

  async set(sid, sess, callback) {
    console.log("set prisma session store");
    return null;
  }

  async touch(sid, sess, callback) {
    console.log("touch prisma session store");
    return null;
  }
}

export default PrismaSessionStore;
