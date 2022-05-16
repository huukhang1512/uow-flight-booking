import axios from 'axios';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    const resp = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/airport/${req.query.id}`,
    );
    return res.status(200).json(resp.data);
  } catch (error) {
    console.error(error);
    return res.status(400).json("");
  }
};

export default handler;
