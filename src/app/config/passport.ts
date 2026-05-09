import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Users } from "../modules/users/user.model";
import bcrypt from "bcryptjs"

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });

        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordMatched) {
          return done(null, false, {
            message: "Password incorrect",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


export default passport;