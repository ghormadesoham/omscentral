import { object, string } from '@hapi/joi';

export const schema = object().keys({
  id: string().required(),
  type: string().allow(null),
  value: string().allow(null),
  user_id: string(),
});
