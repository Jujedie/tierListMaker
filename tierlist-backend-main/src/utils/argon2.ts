import argon2 from 'argon2';
// Hasher un mot de passe
export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

// Comparer un mot de passe avec un hash
export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};
