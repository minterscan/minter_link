import Big from 'bignumber.js'
import { Base64 } from 'js-base64'
import decode from 'entity-decode'
import prettyNum from 'pretty-num'
import { ETxType } from '@/model/Tx'
import { txTypeList } from 'minterjs-tx'

/**
 * Decode base64 encoded string
 *
 * @param value
 */
export function base64decode (value: string) {
  return Base64.decode(value)
}

/**
 * Shorten string
 *
 * @param value
 */
export function shortenString (value: string) {
  const visibleChars = 5

  if (value.length <= 20) { return value }

  return value.substr(0, visibleChars) + '...' + value.substr(-visibleChars)
}

/**
 * Convert Tx type to human readable format
 *
 * @param value
 */
export function getReadableTxType (value: ETxType) {
  const name = txTypeList[value].name

  return name.charAt(0).toUpperCase() + name.slice(1)
}

/**
 * Convert pip to bip
 *
 * @param value
 */
export function pipToBip (value: number) {
  return new Big(value).dividedBy(10 ** 18).toString()
}

/**
 * Prettyfy number value
 *
 * @param value
 */
export function pretty (value: number | string) {
  if (value === null) { return '' }
  if (value === undefined) { return '' }
  if (value > 0.001 || value < -0.001 || Number(value) === 0) {
    return decode(prettyNum(value, { precision: 4, rounding: 'fixed', thousandsSeparator: '  ' }))
  } else {
    return decode(prettyNum(value, { precision: 2, rounding: 'significant', thousandsSeparator: '  ' }))
  }
}

/**
 * Cut decimals to fixed amount
 *
 * @param value
 * @param decimals
 */
export function toFixed (value: number, decimals = 2) {
  return value.toFixed(decimals)
}

/**
 * Get Query string from Object
 *
 * @param data
 */
export function getQuery (data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}
