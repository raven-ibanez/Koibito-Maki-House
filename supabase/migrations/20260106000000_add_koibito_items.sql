-- Create new categories for Koibito Maki House
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('maki-sushi', 'Individual Maki & Sushi', '🍣', 5, true),
  ('musubi', 'Musubi', '🍙', 6, true),
  ('onigiri', 'Onigiri', '🍙', 7, true),
  ('baked-sushi', 'Baked Sushi', '🍱', 8, true),
  ('maki-bilao', 'Maki Bilao', '🍱', 9, true)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active;

-- Insert Individual Maki & Sushi
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('California Maki (Maki)', 'Traditional California maki with kani, cucumber, and mango', 110, 'maki-sushi', true, true),
  ('Kani Sushi (Sushi)', 'Fresh kani sushi', 110, 'maki-sushi', false, true),
  ('Cheezy Maki (Maki)', 'Delicious maki topped with cheese', 110, 'maki-sushi', false, true),
  ('Spicy Tuna Maki (Maki)', 'Spicy tuna maki for a bit of heat', 135, 'maki-sushi', true, true),
  ('Crazy Maki (Maki)', 'Our signature crazy maki', 135, 'maki-sushi', true, true),
  ('Crispy Kani (Maki)', 'Crispy kani maki with a satisfying crunch', 155, 'maki-sushi', false, true),
  ('Crispy Crazy Maki (Maki)', 'Crispy version of our signature crazy maki', 175, 'maki-sushi', false, true);

-- Insert Musubi (2 pcs. per serving)
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Regular Musubi', '2 pcs. per serving - Classic musubi', 120, 'musubi', true, true),
  ('Spicy Tuna Musubi', '2 pcs. per serving - Musubi with spicy tuna', 145, 'musubi', false, true),
  ('Crazy Musubi', '2 pcs. per serving - Musubi with our signature crazy mix', 145, 'musubi', false, true);

-- Insert Onigiri (2 pcs. per serving)
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Spicy Tuna Onigiri', '2 pcs. per serving - Onigiri with spicy tuna filling', 135, 'onigiri', true, true),
  ('Crazy Onigiri', '2 pcs. per serving - Onigiri with crazy mix filling', 135, 'onigiri', false, true);

-- Insert Baked Sushi
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Regular Baked Sushi', 'Our delicious classic baked sushi', 350, 'baked-sushi', true, true),
  ('Spicy Tuna Baked Sushi', 'Baked sushi with a spicy tuna twist', 360, 'baked-sushi', false, true);

-- Insert Regular Maki Bilao
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Regular Maki Bilao', 'Combination of California Maki, Cheezy Maki, Sesame Maki, and Kani Sushi', 600, 'maki-bilao', true, true);

-- Add variations for Regular Maki Bilao
-- Base price 600 is for 50 pcs
INSERT INTO variations (menu_item_id, name, price) VALUES
  ((SELECT id FROM menu_items WHERE name = 'Regular Maki Bilao' LIMIT 1), '50 pcs', 0),
  ((SELECT id FROM menu_items WHERE name = 'Regular Maki Bilao' LIMIT 1), '60 pcs', 100),
  ((SELECT id FROM menu_items WHERE name = 'Regular Maki Bilao' LIMIT 1), '80 pcs', 300),
  ((SELECT id FROM menu_items WHERE name = 'Regular Maki Bilao' LIMIT 1), '100 pcs', 550);

-- Insert Special Maki Bilao items
INSERT INTO menu_items (name, description, base_price, category, popular, available) VALUES
  ('Koibito Megamix (50 pcs)', 'Combination of California Maki, Kani Sushi, Cheezy Maki, and Crazy Maki', 700, 'maki-bilao', true, true),
  ('Koibito 6 Star Mix (60 pcs)', 'Combination of California Maki, Kani Sushi, Cheezy Maki, Crazy Maki, Tuna Maki, and Crispy Crazy Maki', 850, 'maki-bilao', true, true);
