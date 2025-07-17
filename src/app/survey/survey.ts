export type QuestionSet = {
  true: string[]
  false: string[]
}

export type Category = "climate" | "vaccines" | "elections"

export const questionSets: { [C in Category]: QuestionSet } = {
  climate: { true: ["1b95w5m"], false: ["1kgcctc", "1fnz3te", "a36e6n"] },
  vaccines: { true: ["12vw5mr"], false: ["ml5r4y", "ktsyx5", "1ig8qte"] },
  elections: { true: ["1j8eq0f"], false: ["knhbhd", "18eha3t", "1cvea44"] },
}

export const sampleSize = 2

export const instructions =
  "There are 12 questions. For each question, you will be provided with a Reddit post." +
  " After reading and examining the post for up to two minutes, please rate how credible" +
  " you believe the post to be."

export const completionCode = "CSYKA865"
