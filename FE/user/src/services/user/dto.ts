export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export const gender = [
  {
    value: GENDER.MALE,
    title: 'Male'
  },
  {
    value: GENDER.FEMALE,
    title: 'Female'
  },
  {
    value: GENDER.OTHER,
    title: 'Other'
  }
]

export interface UserInfoOutput {
  email: string
  phone: string
  firstName: string
  lastName: string
  dob: string
  gender: string
}

export interface ProfileUserInput {
  firstName: string
  lastName: string
  dob?: string
  gender?: string
}
