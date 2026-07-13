from pathlib import Path
from PIL import Image

root = Path('public')
count = 0
for path in root.rglob('*'):
    if not path.is_file():
        continue
    if path.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
        continue
    out = path.with_suffix('.webp')
    if out.exists():
        continue
    try:
        with Image.open(path) as img:
            if img.mode in {'RGBA', 'LA', 'P'}:
                converted = img.convert('RGBA')
            else:
                converted = img.convert('RGB')
            converted.save(out, 'WEBP', quality=80)
        count += 1
        print(f'saved {out}')
    except Exception as exc:
        print(f'ERR {path} {exc}')
print(f'done {count}')
