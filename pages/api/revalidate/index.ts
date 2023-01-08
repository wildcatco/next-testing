import { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== "test") {
    return res
      .status(401)
      .json({ message: "endpoint only available for test use" });
  }

  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "invalid revalidation secret" });
  }

  // revalidate pages that can have ISR data updates
  // note: 현재 버전에서는 'res.revalidate'로 사용
  await res.unstable_revalidate("/shows");
  await res.unstable_revalidate("/bands");

  return res.status(200).end();
});

export default handler;
