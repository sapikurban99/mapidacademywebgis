import re

path = r"C:\Users\Lenovo\.gemini\antigravity-ide\brain\5f4b8a37-8ea7-4b27-abd5-85ccb3516382\.system_generated\steps\569\content.md"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Decode unicode and hex escapes in python
# e.g., \x22 -> " or \u0022 -> "
# We can do this by converting the string to bytes and decoding using unicode_escape
# But first let's replace actual \\x with \x so it can be evaluated, or use a custom regex to find escaped filenames
escaped_filenames = re.findall(r'(?:\\x22|")([^"\\]{1,100}\.(?:png|svg|jpg|jpeg|gif|pdf|zip|xlsx))', content, re.IGNORECASE)
print(f"Found {len(escaped_filenames)} escaped filename matches:")
for fn in set(escaped_filenames):
    print(" - Escaped filename:", fn)

# Let's search for \x22 followed by alphanumeric name then \x22
# E.g. \x221L17Fh67BGlbCHLLh0jnPI0hpN4N71vBE\x22
drive_ids = re.findall(r'(?:\\x22|")([a-zA-Z0-9_-]{33})(?:\\x22|")', content)
print(f"\nFound {len(drive_ids)} Drive IDs:")
for d in list(set(drive_ids))[:30]:
    print(" - ID:", d)

# Let's print out text that contains png or svg
lines = content.splitlines()
print("\nLines containing png or svg or jpg:")
for line in lines:
    if any(ext in line.lower() for ext in [".png", ".svg", ".jpg"]):
        # Truncate line for printing if too long
        print(" - LINE:", line[:200])
