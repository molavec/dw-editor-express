interface UserType {
  id: number | undefined,
  email: string | undefined,
  firstname?: string | undefined,
  lastname?: string | undefined,
  alias?: string | undefined,
  image?: string,
  token?: string,
}

export default UserType;