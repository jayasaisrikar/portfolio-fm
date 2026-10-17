import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleApi } from '../server/integrations.mjs';
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await handleApi({ url: '/api/workbench', method: req.method }, res);
}
