
export const char = (c: string) => (input: string) => {
  if (input[0] === c) {
    return { success: true, rest: input.slice(1) }
  }
  return { success: false, rest: input }
}