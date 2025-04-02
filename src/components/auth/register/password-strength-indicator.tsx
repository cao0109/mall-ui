import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { calculatePasswordStrength } from '@/lib/utils/password';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const t = useTranslations('auth.register.passwordStrength');
  const strength = calculatePasswordStrength(password);

  // 密码校验条件
  const checks = {
    length: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[@$!%*?&#]/.test(password),
  };

  // 正则表达式完整匹配检查 - 修改为只有强度达到4分及以上才算通过
  const isValidPassword = strength >= 4;

  const getStrengthText = () => {
    if (!password) return '';
    switch (strength) {
      case 0:
        return t('veryWeak');
      case 1:
        return t('weak');
      case 2:
        return t('fair');
      case 3:
        return t('medium');
      case 4:
        return t('strong');
      case 5:
        return t('veryStrong');
      default:
        return '';
    }
  };

  const getStrengthColor = () => {
    if (!password) return 'bg-gray-200';
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      case 5:
        return 'bg-green-600';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {password && `${t('strength')}: ${getStrengthText()}`}
        </span>
        {isValidPassword && (
          <div className="flex items-center text-xs text-green-600">
            <Check className="mr-1 h-3 w-3" />
            {t('validPassword')}
          </div>
        )}
      </div>
      <div className="flex h-1 w-full gap-1">
        {[1, 2, 3, 4, 5].map(index => (
          <div
            key={index}
            className={`h-full w-1/5 rounded-full transition-colors duration-300 ${
              strength >= index ? getStrengthColor() : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* 密码校验项列表 */}
      {password && (
        <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
          <div
            className={`flex items-center ${checks.length ? 'text-green-600' : 'text-muted-foreground'}`}
          >
            <div className="mr-1 h-3 w-3 flex-shrink-0">
              {checks.length ? (
                <Check className="h-3 w-3" />
              ) : (
                <div className="h-2 w-2 rounded-full border border-muted-foreground" />
              )}
            </div>
            <span>{t('minLength')}</span>
            {password.length >= 12 && (
              <span className="ml-1 text-green-600">
                {t('excellentLength', { length: password.length })}
              </span>
            )}
          </div>
          <div
            className={`flex items-center ${checks.hasLower || checks.hasUpper ? 'text-green-600' : 'text-muted-foreground'}`}
          >
            <div className="mr-1 h-3 w-3 flex-shrink-0">
              {checks.hasLower || checks.hasUpper ? (
                <Check className="h-3 w-3" />
              ) : (
                <div className="h-2 w-2 rounded-full border border-muted-foreground" />
              )}
            </div>
            <span>{t('hasLetter')}</span>
            {checks.hasLower && checks.hasUpper && (
              <span className="ml-1 text-green-600">{t('excellentCase')}</span>
            )}
          </div>
          <div
            className={`flex items-center ${checks.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}
          >
            <div className="mr-1 h-3 w-3 flex-shrink-0">
              {checks.hasNumber ? (
                <Check className="h-3 w-3" />
              ) : (
                <div className="h-2 w-2 rounded-full border border-muted-foreground" />
              )}
            </div>
            <span>{t('hasNumber')}</span>
          </div>
          <div
            className={`flex items-center ${checks.hasSpecial ? 'text-green-600' : 'text-muted-foreground'}`}
          >
            <div className="mr-1 h-3 w-3 flex-shrink-0">
              {checks.hasSpecial ? (
                <Check className="h-3 w-3" />
              ) : (
                <div className="h-2 w-2 rounded-full border border-muted-foreground" />
              )}
            </div>
            <span>{t('hasSpecial')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
