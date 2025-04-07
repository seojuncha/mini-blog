import prisma from "../utils/prismaClient.js";
import bcrypt from "bcrypt";

// email: string
// password: string(hashed password)
// callback: function
export const authenticate = async (email, password, callback) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    if (password === user.password) {
      callback({
        success: true,
        publicId: user.publicId,
      });
    } else {
      callback({ success: false, err: "auth error" });
    }
  } else {
    callback({ success: false, err: "cannot find the user" });
  }
};
