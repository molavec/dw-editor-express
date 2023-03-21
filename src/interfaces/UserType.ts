export default interface UserType {
  id: string | undefined;
  email: string | undefined;
  firstname?: string | undefined;
  lastname?: string | undefined;
  alias?: string | undefined;
  image?: string;
  walletAddress?: string;
}
