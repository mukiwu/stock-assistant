/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true
  },
  env: {
    API_KEY: process.env.API_KEY
  }
}

module.exports = config