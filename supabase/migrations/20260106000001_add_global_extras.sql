-- Add Global Extras to all menu items
-- The following extras will be added as add-ons for every item:
-- Japanese Mayo: 15.00
-- Kikoman (soy sauce): 15.00
-- Wasabi: 15.00
-- Chop stick: 3.00

INSERT INTO add_ons (menu_item_id, name, price, category)
SELECT id, 'Japanese Mayo', 15.00, 'Extras' FROM menu_items
UNION ALL
SELECT id, 'Kikoman (soy sauce)', 15.00, 'Extras' FROM menu_items
UNION ALL
SELECT id, 'Wasabi', 15.00, 'Extras' FROM menu_items
UNION ALL
SELECT id, 'Chop stick', 3.00, 'Extras' FROM menu_items;
