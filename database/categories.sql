-- Category tree only (used for a clean install without demo products).
INSERT IGNORE INTO categories (id,parent_id,slug,name,icon,seo_text,commission_percent,sort_order,show_in_header,is_active) VALUES
('1af17c46-fe89-415a-b2a5-98f4da7d612e',NULL,'games','Games','gamepad-2','Game currency, top-ups and items from trusted sellers.',10.0,1,0,1),
('bc7c74f5-3793-4314-a9e6-53a6e813df41',NULL,'software','Software','app-window','Licence keys for operating systems, office suites and tools.',8.0,2,0,1),
('b5f1f042-9fe0-475d-b787-0a7559f3d35a',NULL,'subscriptions','Subscriptions','calendar-clock','Streaming, music and gaming subscriptions.',9.0,3,1,1),
('7f85068a-2f12-436f-9413-c1810c9ed91e',NULL,'gift-cards','Gift cards','gift','Digital gift cards for stores and platforms.',6.0,4,1,1),
('9e3c60b0-dd67-47bf-8dd7-27036eade14a','1af17c46-fe89-415a-b2a5-98f4da7d612e','roblox','Roblox','box','Robux, top-ups and limited items for Roblox.',10.0,1,1,1),
('e379849b-1ee7-43ec-b516-5150c0c30552','9e3c60b0-dd67-47bf-8dd7-27036eade14a','robux-gift-cards','Robux gift cards','credit-card','Roblox gift card codes with instant delivery.',10.0,1,1,1),
('8d8f11b4-9c51-41d0-9194-3dcf75eb83ee','1af17c46-fe89-415a-b2a5-98f4da7d612e','playstation','PlayStation','gamepad','PlayStation wallet cards and PS Plus.',8.0,2,1,1),
('10adf828-6d9d-495c-9460-f8a823d52d5d','9e3c60b0-dd67-47bf-8dd7-27036eade14a','roblox-top-up','Top up by username','user-plus','Robux sent straight to your Roblox username.',10.0,2,0,1),
('6f1b3b81-7e56-4b12-a8f7-b59a2463aabe','9e3c60b0-dd67-47bf-8dd7-27036eade14a','roblox-limited-items','Limited items','crown','Rare Roblox limited items.',10.0,3,0,1);
