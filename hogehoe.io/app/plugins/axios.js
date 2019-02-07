export default function({ $axios }) {
  $axios.onRequest((config) => {
    if( process.env.GITHUB_TOKEN ) {
      config.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }
    return config
  })
}