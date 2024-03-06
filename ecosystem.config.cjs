module.exports = {
  apps: [{
    name: 'client',
    script: './dist/server/index.mjs',
    instances: 2,
    exec_mode: 'cluster',
    increment_var: 'PORT',
    env: {
      HOST: '127.0.0.1',
      PORT: 3003,
      NODE_ENV: 'production'
    }
  }]
}
