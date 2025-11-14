/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/list',
  '@fullcalendar/timeline'
]);

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: ['flagcdn.com']
  },
  async rewrites() {
    return [
      // HR API 예시
      {
        source: '/hr/:path*',
        destination: 'http://localhost:9101/hr/:path*'
      },
      // 필요한 엔드포인트를 더 추가 (auth, file 등)
      {
        source: '/auth/:path*',
        destination: 'http://localhost:9101/auth/:path*'
      }
    ];
  },
  env: {
    REACT_APP_VERSION: process.env.REACT_APP_VERSION,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,

    REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

    REACT_APP_AWS_POOL_ID: process.env.REACT_APP_AWS_POOL_ID,
    REACT_APP_AWS_APP_CLIENT_ID: process.env.REACT_APP_AWS_APP_CLIENT_ID,

    REACT_APP_AUTH0_CLIENT_ID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    REACT_APP_AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN
  }
});

module.exports = nextConfig;
