/**
 * 计算密码强度
 * @param password 密码字符串
 * @returns 密码强度分数 (0-5)
 */
export function calculatePasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&#]/.test(password)) strength++;
  return Math.min(5, strength);
}
