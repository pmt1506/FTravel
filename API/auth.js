import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
import * as dotenv from "dotenv";
import { accountDAO } from "./repositories/index.js";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9999/account/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const existAccount = await accountDAO.findAccountByEmail(
          profile._json.email
        );
        if (existAccount) {
          const { createdAt, updatedAt, ...filteredAccount } = existAccount;
          done(null, filteredAccount);
        } else {
          done(null, { error: "email not found, please sign up" });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
export default passport;
