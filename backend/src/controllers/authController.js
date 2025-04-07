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
    const result = await bcrypt.compare(password, user.password);
    if (result) callback({ success: true, user: user });
    else callback({ success: false, message: "auth error" });
  } else {
    callback({ success: false, message: "no user" });
  }
};
