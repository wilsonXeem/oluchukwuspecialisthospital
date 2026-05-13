export interface PasswordStrength {
  score: number; // 0-7
  feedback: string[];
  isValid: boolean;
}

export class PasswordStrengthUtil {
  private static readonly MIN_LENGTH = 12;
  private static readonly COMMON_PASSWORDS = [
    'password', '123456', 'admin', 'hospital', 'medical', 'health'
  ];

  static validate(password: string): PasswordStrength {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= this.MIN_LENGTH) score++;
    else feedback.push(`At least ${this.MIN_LENGTH} characters`);

    if (/[a-z]/.test(password)) score++;
    else feedback.push('One lowercase letter');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('One uppercase letter');

    if (/\d/.test(password)) score++;
    else feedback.push('One number');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    else feedback.push('One special character');

    if (!/(..).*\1/.test(password)) score++;
    else feedback.push('No repeated patterns');

    if (!this.COMMON_PASSWORDS.some(common => 
      password.toLowerCase().includes(common))) score++;
    else feedback.push('No common words');

    return {
      score,
      feedback,
      isValid: score >= 6 && password.length >= this.MIN_LENGTH
    };
  }

  static getStrengthText(score: number): string {
    if (score <= 2) return 'Very Weak';
    if (score <= 4) return 'Weak';
    if (score === 5) return 'Fair';
    if (score === 6) return 'Good';
    return 'Strong';
  }

  static getStrengthColor(score: number): string {
    if (score <= 2) return '#ff4757';
    if (score <= 4) return '#ff6b7a';
    if (score === 5) return '#ffa502';
    if (score === 6) return '#2ed573';
    return '#1e90ff';
  }

  static generatePasswordRequirements(): string[] {
    return [
      `At least ${this.MIN_LENGTH} characters long`,
      'Contains uppercase and lowercase letters',
      'Contains at least one number',
      'Contains at least one special character',
      'No repeated patterns',
      'No common words'
    ];
  }
}