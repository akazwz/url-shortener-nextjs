import { NextApiHandler } from 'next'

const handle: NextApiHandler = (req, res) => {
	res.status(200).json({
		success: true
	})
}

export default handle