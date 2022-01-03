export default {
  jwt: {
    secret: process.env.API_SECRET as string,
    expiresIn: '1d',
  },
};
