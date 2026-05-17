-- =====================================================
--  Swad Ghar Ka - MySQL Database Setup Script
--  Run this in MySQL Workbench or MySQL CLI
-- =====================================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS swadgharka_db;
USE swadgharka_db;

-- Step 2: Tables are auto-created by Spring Boot (ddl-auto=update)
-- Just run the app once and tables will be created automatically!

-- Step 3: Seed sample menu items (run AFTER starting the app once)
INSERT INTO menu_items (name, description, price, category, image_url, is_veg, available, preparation_time_minutes) VALUES
-- Breakfast
('Aloo Paratha',        'Crispy whole wheat flatbread stuffed with spiced potato, served with butter & curd',         80.00,  'Breakfast', '/images/paratha.jpg',      true,  true, 15),
('Poha',               'Light flattened rice with mustard seeds, curry leaves, and green chillies',                   60.00,  'Breakfast', '/images/poha.jpg',          true,  true, 10),
('Idli Sambar',        'Soft steamed rice cakes served with tangy sambar and coconut chutney',                        70.00,  'Breakfast', '/images/idli.jpg',          true,  true, 15),
('Masala Dosa',        'Crispy rice crepe filled with spiced potato masala, served with sambar & chutney',           100.00, 'Breakfast', '/images/dosa.jpg',          true,  true, 20),

-- Lunch
('Dal Tadka',          'Classic yellow dal with aromatic ghee tempering',                                            120.00, 'Lunch',     '/images/dal.jpg',           true,  true, 20),
('Rajma Rice',         'Hearty red kidney bean curry with steamed basmati rice',                                     140.00, 'Lunch',     '/images/rajma.jpg',         true,  true, 25),
('Paneer Butter Masala','Cottage cheese in rich tomato-cashew gravy, best with roti',                                180.00, 'Lunch',     '/images/paneer.jpg',        true,  true, 25),
('Chicken Curry',      'Home-style chicken curry slow-cooked with whole spices',                                     220.00, 'Lunch',     '/images/chicken.jpg',       false, true, 30),
('Mutton Rogan Josh',  'Tender mutton in Kashmiri-inspired red gravy',                                               280.00, 'Lunch',     '/images/rogan_josh.jpg',    false, true, 45),
('Mix Veg',            'Seasonal vegetables cooked in North Indian spice blend',                                     130.00, 'Lunch',     '/images/mix_veg.jpg',       true,  true, 20),

-- Dinner
('Butter Chicken',     'Succulent chicken in velvety tomato-cream sauce',                                            250.00, 'Dinner',    '/images/butter_chicken.jpg',false, true, 30),
('Palak Paneer',       'Cottage cheese cubes in creamy spinach gravy',                                               170.00, 'Dinner',    '/images/palak.jpg',         true,  true, 25),
('Jeera Rice',         'Fragrant basmati rice tempered with cumin',                                                   80.00, 'Dinner',    '/images/jeera_rice.jpg',    true,  true, 15),
('Tandoori Roti',      'Whole wheat bread baked in clay oven, served hot with butter',                                25.00, 'Dinner',    '/images/roti.jpg',          true,  true, 10),

-- Snacks
('Samosa (2 pcs)',     'Crispy pastry stuffed with spiced potato and peas',                                           30.00, 'Snacks',    '/images/samosa.jpg',        true,  true, 10),
('Onion Pakoda',       'Crispy fried onion fritters with spiced batter',                                              50.00, 'Snacks',    '/images/pakoda.jpg',        true,  true, 15),
('Pani Puri',          'Hollow puris filled with spiced tamarind water — 6 pieces',                                   40.00, 'Snacks',    '/images/panipuri.jpg',      true,  true, 10),

-- Dessert
('Gulab Jamun',        'Soft milk-solid dumplings soaked in rose-flavored sugar syrup',                               60.00, 'Dessert',   '/images/gulab.jpg',         true,  true, 5),
('Kheer',              'Creamy rice pudding with cardamom, saffron, and dry fruits',                                   80.00, 'Dessert',   '/images/kheer.jpg',         true,  true, 5),
('Gajar Halwa',        'Slow-cooked carrot pudding with ghee, milk, and cardamom',                                   100.00, 'Dessert',   '/images/halwa.jpg',         true,  true, 5),

-- Drinks
('Masala Chai',        'Aromatic Indian spiced milk tea',                                                             30.00, 'Drinks',    '/images/chai.jpg',          true,  true, 5),
('Lassi (Sweet)',      'Chilled sweet yogurt drink',                                                                   50.00, 'Drinks',    '/images/lassi.jpg',         true,  true, 5),
('Nimbu Pani',         'Fresh lemonade with cumin and black salt',                                                     40.00, 'Drinks',    '/images/nimbu.jpg',         true,  true, 5);

-- Step 4: Create an admin user (password = "admin123" — BCrypt encoded)
-- You can also register via API and manually update role to ADMIN
INSERT INTO users (name, email, password, phone, role) VALUES
('Admin', 'admin@swadgharka.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE36mggZHBH2hyoAa', '9999999999', 'ADMIN');
-- Note: The above BCrypt hash corresponds to password "admin123"

SELECT 'Database setup complete! Tables and sample data created.' AS Status;
