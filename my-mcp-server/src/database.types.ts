export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_number: string
          account_type: string
          available_balance: number
          balance: number
          created_at: string | null
          daily_limit: number | null
          id: string
          interest_rate: number | null
          is_active: boolean | null
          routing_number: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_number: string
          account_type: string
          available_balance?: number
          balance?: number
          created_at?: string | null
          daily_limit?: number | null
          id?: string
          interest_rate?: number | null
          is_active?: boolean | null
          routing_number?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_number?: string
          account_type?: string
          available_balance?: number
          balance?: number
          created_at?: string | null
          daily_limit?: number | null
          id?: string
          interest_rate?: number | null
          is_active?: boolean | null
          routing_number?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          account_number: string | null
          category: string | null
          created_at: string | null
          due_date: string
          id: string
          is_autopay: boolean | null
          is_paid: boolean | null
          minimum_payment: number
          payee: string
          statement_balance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_number?: string | null
          category?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          is_autopay?: boolean | null
          is_paid?: boolean | null
          minimum_payment: number
          payee: string
          statement_balance: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_number?: string | null
          category?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          is_autopay?: boolean | null
          is_paid?: boolean | null
          minimum_payment?: number
          payee?: string
          statement_balance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          account_id: string
          amount: number
          bill_id: string
          confirmation_number: string
          created_at: string | null
          id: string
          notes: string | null
          payment_type: string
          processed_date: string | null
          scheduled_date: string | null
          status: string | null
        }
        Insert: {
          account_id: string
          amount: number
          bill_id: string
          confirmation_number?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_type: string
          processed_date?: string | null
          scheduled_date?: string | null
          status?: string | null
        }
        Update: {
          account_id?: string
          amount?: number
          bill_id?: string
          confirmation_number?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_type?: string
          processed_date?: string | null
          scheduled_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_history_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_history_bill_id_fkey"
            columns: ["bill_id"]
            isOneToOne: false
            referencedRelation: "bills"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string
          amount: number
          balance_after: number
          category: string | null
          created_at: string | null
          description: string
          id: string
          merchant: string | null
          metadata: Json | null
          reference_number: string | null
          status: string | null
          transaction_type: string
        }
        Insert: {
          account_id: string
          amount: number
          balance_after: number
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          merchant?: string | null
          metadata?: Json | null
          reference_number?: string | null
          status?: string | null
          transaction_type: string
        }
        Update: {
          account_id?: string
          amount?: number
          balance_after?: number
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          merchant?: string | null
          metadata?: Json | null
          reference_number?: string | null
          status?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: Json | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          id: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      account_summary: {
        Row: {
          account_number: string | null
          account_type: string | null
          available_balance: number | null
          balance: number | null
          id: string | null
          last_transaction_date: string | null
          transaction_count: number | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recent_transactions: {
        Row: {
          account_id: string | null
          account_number: string | null
          account_type: string | null
          amount: number | null
          balance_after: number | null
          category: string | null
          created_at: string | null
          description: string | null
          id: string | null
          merchant: string | null
          transaction_type: string | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "account_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const 