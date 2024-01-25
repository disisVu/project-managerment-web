export interface CreateUserInput {
  email: string
  phone: string
  firstName: string
  lastName: string
  dob?: string
  gender?: string
  password: string
  repassword: string
}

export interface LoginUserInput {
  username: string
  password: string
}
