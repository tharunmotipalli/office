import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClearvueValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    customerId: schema.number(),
    resolution: schema.enum(['86400','1440','900']),
    startDate:schema.date({format: 'yyyy-MM-dd HH:mm:ss'}),
    endDate:schema.date({format: 'yyyy-MM-dd HH:mm:ss'})
  })
  public messages: CustomMessages = {}
}
