import axios from 'axios';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/flight`,
      req.body.data
    );
    return res.status(200).json(resp.data.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Cannot load data' });
  }
};

export default handler;
