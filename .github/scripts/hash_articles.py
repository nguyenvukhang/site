from hashlib import sha256
from os import listdir, path, rename

ROOT_DIR = path.dirname(path.dirname(path.dirname(__file__)))
ARTICLES_DIR = path.join(ROOT_DIR, "src/content/articles")


assert path.exists(path.join(ROOT_DIR, "package.json"))


def markdown_files(directory):
    for f in listdir(directory):
        if f.endswith(".mdx") or f.endswith(".md"):
            yield path.join(directory, f)


def main():
    unique = set("")
    for filepath in markdown_files(ARTICLES_DIR):
        filename, fileext = path.splitext(filepath)

        # don't re-hash the files that have already been nicely hashed. This
        # preserves website URLs even after edits.
        if path.basename(filename).isdigit():
            continue

        m = sha256()
        with open(filepath, "rb") as f:
            m.update(f.read())
        h = int(m.hexdigest()[:16], 16)
        h_str = str(h)[:8]

        assert h_str not in unique, "Non-unique hash generated. Oops."
        unique.add(h_str)
        correct_path = path.join(ARTICLES_DIR, f"{h_str}{fileext}")
        if filepath != correct_path:
            rename(filepath, correct_path)


if __name__ == "__main__":
    main()
