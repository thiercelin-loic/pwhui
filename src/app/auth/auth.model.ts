export interface User {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  roles?: string[];
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string | null;
}

export interface Login {
  email: string;
  password: string;
}