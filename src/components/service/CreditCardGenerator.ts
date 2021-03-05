

class CreditCardGenerator {
  private static instance: CreditCardGenerator
  private visaPrefixList: string[]
  private mastercardPrefixList: string[]
  private pseudoRandom: any
  private schema: any

  constructor() {
    this.pseudoRandom = Math.random

    this.mastercardPrefixList = ['51', '52', '53', '54', '55']
    this.visaPrefixList = ['4539', '4556', '4916', '4532', '4929', '40240071', '4485', '4716', '4']

    this.schema = {
      VISA: {
        prefixList: this.visaPrefixList,
        digitCount: 16
      },
      MasterCard: {
        prefixList: this.mastercardPrefixList,
        digitCount: 16
      }
    }
  }

  public static getInstance(): CreditCardGenerator {
    if (!CreditCardGenerator.instance) {
      CreditCardGenerator.instance = new CreditCardGenerator()
    }
    return CreditCardGenerator.instance
  }

  private strrev(str: string) {
    if (!str) return ''
    let revstr = ''
    for (let i = str.length - 1; i >= 0; i--)
      revstr += str.charAt(i)
    return revstr
  }

  private completedNumber(prefix: any, length: number) {
    let ccnumber = prefix

    // generate digits
    while (ccnumber.length < (length - 1)) {
      ccnumber += Math.floor(this.pseudoRandom() * 10)
    }

    // reverse number and convert to int
    const reversedCCnumberString = this.strrev(ccnumber)

    let reversedCCnumber = []
    for (let i = 0; i < reversedCCnumberString.length; i++) {
      reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i))
    }

    // calculate sum

    let sum = 0
    let pos = 0

    while (pos < length - 1) {

      let odd = reversedCCnumber[pos] * 2
      if (odd > 9) {
        odd -= 9
      }

      sum += odd

      if (pos != (length - 2)) {

        sum += reversedCCnumber[pos + 1]
      }
      pos += 2
    }

    // calculate check digit

    let checkdigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10
    ccnumber += checkdigit

    return ccnumber

  }

  private creditCardNumber(prefixList: any, length: number) {
    let result = []
    const randomArrayIndex = Math.floor(this.pseudoRandom() * prefixList.length)
    const ccnumber = prefixList[randomArrayIndex]
    result.push(this.completedNumber(ccnumber, length))

  }

  public generate(CardScheme: string) {
    // Try to get configs to the selected Scheme
    if (typeof this.schema[CardScheme] != 'undefined') {
      return this.creditCardNumber(
        this.schema[CardScheme].prefixList,
        this.schema[CardScheme].digitCount,
      )
    }
    else { // Defaults to MasterCard
      return this.creditCardNumber(
        this.schema["MasterCard"].prefixList,
        this.schema["MasterCard"].digitCount,
      )
    }
  }
}

export default CreditCardGenerator