/*
  # Initial Schema Setup for AI-Driven E-Commerce

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `category` (text)
      - `features` (jsonb)
      - `created_at` (timestamp)
    
    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `preferences` (jsonb)
      - `created_at` (timestamp)
    
    - `product_interactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, references products)
      - `interaction_type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text,
  category text,
  features jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  preferences jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Product interactions table for recommendation engine
CREATE TABLE IF NOT EXISTS product_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_id uuid REFERENCES products NOT NULL,
  interaction_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_interactions ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- User preferences policies
CREATE POLICY "Users can view their own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Product interactions policies
CREATE POLICY "Users can view their own interactions"
  ON product_interactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own interactions"
  ON product_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);