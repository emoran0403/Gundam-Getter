import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { CLIENTINFO } from "../config";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //@ts-ignore
  done(null, user);
});
try {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CLIENTINFO.clientID!,
        clientSecret: CLIENTINFO.clientSecret!,
        //   callbackURL: process.env.WEB_URI+"/api/auth/callback/google",
        callbackURL: "localhost:3000",

        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        done(null, false);
        console.log({ accessToken, refreshToken, done, profile });
      }
    )
  );
  console.log(`wow lol`);
} catch (error) {
  console.log(error);
}

//@ts-ignore
passport.initialize();
