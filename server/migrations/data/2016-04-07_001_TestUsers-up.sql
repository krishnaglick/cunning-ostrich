
INSERT INTO users (email, password)
VALUES
('admin', 'swordfish')
ON CONFLICT DO NOTHING;
