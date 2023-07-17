import {handleCallback, Session} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import {setCookie} from "cookies-next";

const callbackHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await handleCallback(req, res, {afterCallback});
    } catch (error) {
        // @ts-ignore
        res.status(error.status || 400).end(error.message);
    }
};

export default callbackHandler;


const afterCallback = (req: NextApiRequest, res: NextApiResponse,session: Session) => {
    setCookie("token", session.accessToken, {req, res, maxAge: 60 * 60 * 24});
    return session
};