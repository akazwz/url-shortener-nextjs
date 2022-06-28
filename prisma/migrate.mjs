import env from 'dotenv'
import { exec } from 'child_process'

env.config()

const cmd = `set DATABASE_URL=${process.env.MIGRATE_DATABASE_URL} && npx prisma db push`

console.log(cmd)

exec(cmd, (error, stdout, stderr) => {
	console.log(error)
	console.log(stdout)
	console.log(stderr)
})

