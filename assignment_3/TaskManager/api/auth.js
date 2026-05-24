import { supabase } from './supabase';

// Register a new user
export const signUp = async ({ email, password }) => {
  // Check if email already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email);

  if (existing && existing.length > 0) throw new Error('Email already registered');

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { token: `token-${data.id}`, user: data };
};

// Login existing user
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) throw new Error('Invalid email or password');
  return { token: `token-${data.id}`, user: data };
};