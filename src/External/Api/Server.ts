import 'reflect-metadata'
import dotenv from 'dotenv'
import app from './App'

dotenv.config()

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(
        `[server]: Server is up and running at http://localhost:${port} 🚀`
    )
})

app.get('/', (req, res) => {
    res.redirect('/public/docs')
})
