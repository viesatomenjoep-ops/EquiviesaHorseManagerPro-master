import re

with open('supabase_master.sql', 'r') as f:
    content = f.read()

# Regular expression to match CREATE TYPE ... AS ENUM (...); spanning multiple lines
pattern = re.compile(r'(CREATE TYPE [a-zA-Z0-9_]+ AS ENUM \([^)]+\);)', re.DOTALL)

def replacer(match):
    stmt = match.group(1)
    return f"DO $$ BEGIN\n    {stmt}\nEXCEPTION\n    WHEN duplicate_object THEN null;\nEND $$;"

new_content = pattern.sub(replacer, content)

with open('supabase_master.sql', 'w') as f:
    f.write(new_content)
