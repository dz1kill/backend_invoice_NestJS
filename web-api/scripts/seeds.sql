INSERT INTO company (name, address, scope) VALUES
  ('KFC','Worsley Bridge Rd, London SE26 5BZ','FastFood'),
  ('mcDoner','130 High St, London SE20 7EZ','FastFood'),
  ('mcDonalds','137 Sydenham Rd, London SE26 5HB','FastFood'),
  ('Evroopt','Bromley Hill, Bromley BR1 4JD','Shop'),
  ('Belamarket','174 Sydenham Rd, London SE26 5JZ','Shop');

INSERT INTO client (first_name, last_name, email, company_id) VALUES
  ('Johni','Doel','doel123@examples.com',4),
  ('Oliver','Williams','will24@examples.com',1),
  ('Gabriel','Peters','pete78@examples.com',2),
  ('Oleg','Gibson','oleg23@examples.com',5),
  ('Derek','Jordan','der@examples.com',3),
  ('Christian','Collins','coll89@examples.com',4),
  ('Iris','Grant','grant28@examples.com',4),
  ('Ariel','Davis','davi89@examples.com',4),
  ('Olga','Sol','sol89@examples.com',1),
  ('Valery','Joi','valery65@examples.com',3),
  ('Wendy','Doel','wendy45@examples.com',5);

INSERT INTO log (first_name, last_name, email, company, successfully, summ_cost, invoice_id, created_at) VALUES
  ('Johni','Doel','doel123@examples.com','KFC', true, 32, '7db327eb-f381-4ad0-850d-b2fc0aad35b1' ,'2022-09-24T08:47:17.193Z'),
  ('Oliver','Williams','will24@examples.com','mcDonalds', true, 12, '7cb9a014-3b0f-4db1-aff5-d19f19d376ad','2022-09-24T08:47:17.193Z'),
  ('Gabriel','Peters','pete78@examples.com','mcDoner', true, 44, '6f7abbe5-6fd6-4589-9845-a83530d4af5d','2022-09-25T08:47:17.193Z'),
  ('Oleg','Gibson','oleg23@examples.com','Evroopt', true, 55, 'e08b877c-08e4-4571-a374-1465605ca38a','2022-09-25T08:47:17.193Z'),
  ('Derek','Jordan','der@examples.com','mcDoner', true, 33, 'd69852f8-7378-4fe9-b26d-3be7a8cf34fb','2022-09-25T08:47:17.193Z'),
  ('Christian','Collins','coll89@examples.com','KFC', true, 54, '41fe40e4-01a3-4cb0-bcd5-337f5c6fae5b','2022-09-25T08:47:17.193Z'),
  ('Iris','Grant','grant28@examples.com','Belamarket', true, 23, '2d78e46d-4686-4aa6-b95a-83e232027de8','2022-09-25T08:47:17.193Z'),
  ('Ariel','Davis','davi89@examples.com','mcDoner', true, 14, '9f456b76-e8ff-4355-a226-027882f51259','2022-09-26T08:47:17.193Z'),
  ('Olga','Sol','sol89@examples.com','mcDonalds', true, 55, '88da5b3d-2555-4c16-b353-9931e8e77f3e','2022-09-26T08:47:17.193Z'),
  ('Valery','Joi','valery65@examples.com','Evroopt', true, 66, '8e978387-fdba-445f-821b-5c13baa16f4a','2022-09-26T08:47:17.193Z'),
  ('Wendy','Doel','wendy45@examples.com','KFC', true, 77, 'd14a8478-00ac-44de-b318-6a1a070c2e09','2022-09-26T08:47:17.193Z');