import passport from 'passport';
import { Router } from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: 'http://localhost:5000/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('Google Profile:', profile);

            try {
                if (!profile.emails || profile.emails.length === 0) {
                    return done(new Error('No email found for user'), false);
                }

                const email = profile.emails[0].value;
                const firstName = profile.name?.givenName || 'Unknown';
                const lastName = profile.name?.familyName || 'Unknown';

                let user = await User.findOne({ email });

                if (!user) {
                    console.log('User not found, creating new user...');
                    user = new User({
                        firstName,
                        lastName,
                        email,
                        password: '',
                        authMethod: 'google',
                    });

                    await user.save()
                        .then((savedUser) => {
                            console.log('New user created:', savedUser);
                        })
                        .catch((error) => {
                            console.error('Error saving new user:', error);
                            return done(error, false);
                        });
                } else {
                    console.log('User found:', user);
                }

                return done(null, user);
            } catch (error) {
                console.error('Error in Google Strategy:', error);
                return done(error, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error, null);
    }
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        console.log('Google authentication successful, redirecting...');
        res.redirect('http://localhost:5173/selectionpage');
    }
);

export default router;
