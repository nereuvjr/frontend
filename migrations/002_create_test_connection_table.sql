-- Create a simple table for testing database connection
CREATE TABLE public.test_connection (
    id SERIAL PRIMARY KEY
);

-- Insert a test row
INSERT INTO public.test_connection DEFAULT VALUES;
