import bcrypt from 'bcryptjs';

const AUTH_USERNAME = process.env.AUTH_USERNAME || 'admin';
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'password';

// Hash the password once at startup for comparison
const hashedPassword = bcrypt.hashSync(AUTH_PASSWORD, 10);

export async function validateCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  if (username !== AUTH_USERNAME) {
    return false;
  }

  return await bcrypt.compare(password, hashedPassword);
}
