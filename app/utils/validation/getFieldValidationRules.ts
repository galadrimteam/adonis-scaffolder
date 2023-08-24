import {
  MetaAttributeValidation,
  StringAttributeValidation,
} from 'App/utils/validation/modelAttributesValidation'

interface FieldToValidate {
  name: string
  validation: MetaAttributeValidation
}

const getRulesSuffixValidation = (validation: MetaAttributeValidation) => {
  let suffix = ''

  if (validation.nullable) suffix += '.nullable'
  if (validation.optional) suffix += '.optional'

  return suffix
}

const prepareRuleParam = (obj: any) => {
  const stringified = JSON.stringify(obj)
  const unescaped = stringified.replace(/\\/g, '')

  return unescaped
}

const stringValidationRules = (validation: StringAttributeValidation) => {
  const rules: string[] = []

  if (validation.trim) rules.push('rules.trim()')
  if (validation.minLength) rules.push(`rules.minLength(${validation.minLength})`)
  if (validation.maxLength) rules.push(`rules.maxLength(${validation.maxLength})`)
  if (validation.alpha) rules.push(`rules.alpha(${prepareRuleParam(validation.alpha)})`)
  if (validation.alphaNum) rules.push(`rules.alphaNum(${prepareRuleParam(validation.alphaNum)})`)
  if (validation.confirmed) rules.push(`rules.confirmed('${validation.confirmed}')`)

  return rules
}

/*

  minLength?: MinLengthRule
  maxLength?: MaxLengthRule
  confirmed?: ConfirmedRule
  email?: EmailRule
  ip?: IpRule
  regex?: RegexRule
  uuid?: UuidRule
  mobile?: MobileRule
  notIn?: NotInRule
  url?: UrlRule
  escape?: boolean
  trim?: boolean

*/

const getValidationRules = (validation: MetaAttributeValidation) => {
  const rules: string[] = []

  if (validation.type === 'string') {
    rules.push(...stringValidationRules(validation))
  }

  return rules.join(', ')
}

// returns something like this:
// label: schema.string([rules.trim(), rules.maxLength(20), rules.minLength(2)]),
export const getFieldValidationRules = (field: FieldToValidate): string => {
  const { name, validation } = field
  const suffix = getRulesSuffixValidation(validation)
  const rules = getValidationRules(validation)

  return `${name}: schema.${validation.type}${suffix}([${rules}])`
}
