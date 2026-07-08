import type { Messages } from './messages/ar'
import { ar } from './messages/ar'
import { en } from './messages/en'
import type { Locale } from './config'

const messages: Record<Locale, Messages> = { ar, en }

export function getTranslations(locale: Locale): Messages {
  return messages[locale]
}
