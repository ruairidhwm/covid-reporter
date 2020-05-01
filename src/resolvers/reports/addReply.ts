import { sendNotification } from '@beatgig/hermes'
import { Reply } from '../../entity/Reply'
import { Request } from '../../entity/Request'

const addReply = async (
  _: void,
  {
    request: {
      request: {},
    },
    message: {
      message: {},
    },
  },
  { req }: { req: Request },
) => {
  if (!req.userId) {
    return {
      code: 403,
      success: false,
      message: 'Not logged in.',
    }
  }

  const requestInDB = await Request.findOne({ where: { id: request } })

  if (!requestInDB) {
    return {
      code: 403,
      success: false,
      message: 'No request to reply to',
    }
  }

  const requester = await Request.findOne({
    relations: ['report', 'report.user'],
    where: { id: requestInDB.id },
  })

  const requesterEmail = requester?.report.user.email

  const reply = await Reply.create({
    message,
    request: requestInDB,
    user: req.userId,
  } as Object).save()

  await sendNotification({
    channels: ['email'],
    email: {
      to: requesterEmail,
      from: 'test@test.com',
      subject: 'You received a reply to your request',
      template: 'reply-received',
      templateData: {
        response: reply.message,
      },
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  })

  return {
    code: 200,
    success: true,
    message: 'Successfully added reply',
    reply,
  }
}

export default addReply
