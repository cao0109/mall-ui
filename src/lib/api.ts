const API_BASE_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

interface RegisterParams {
  email: string;
  password: string;
  store_name: string;
  first_name: string;
  last_name: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface ResetPasswordParams {
  email: string;
  code: string;
  password: string;
}

interface ApiResponse<T> {
  user: T;
  token: string;
}

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiService {
  private static async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(response.status, data.message || '请求失败');
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, '网络请求失败');
    }
  }

  static async registerVendor(params: RegisterParams): Promise<ApiResponse<UserData>> {
    return this.request<ApiResponse<UserData>>('/vendor/users', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  static async registerSeller(params: RegisterParams): Promise<ApiResponse<UserData>> {
    return this.request<ApiResponse<UserData>>('/seller/users', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  static async login(params: LoginParams): Promise<ApiResponse<UserData>> {
    return this.request<ApiResponse<UserData>>('/auth/token', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  static async sendVerificationCode(email: string): Promise<void> {
    return this.request<void>('/auth/email/code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async forgotPassword(email: string): Promise<void> {
    return this.request<void>('/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async resetPassword(params: ResetPasswordParams): Promise<ApiResponse<UserData>> {
    return this.request<ApiResponse<UserData>>('/auth/password/reset/confirm', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  static async validateResetCode(email: string, code: string): Promise<boolean> {
    return this.request<boolean>('/auth/password/reset/validate', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  }
}

export type { ApiResponse, LoginParams, RegisterParams, ResetPasswordParams, UserData };
