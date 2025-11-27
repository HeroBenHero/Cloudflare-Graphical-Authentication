import os
from pathlib import Path

def generate_index_html(dir_name, subdirs, files):
    lines = [
        "<html>",
        "<head>",
        f"  <title>Index of {dir_name}</title>",
        "  <meta charset='UTF-8'>",
        "</head>",
        "<body>",
    ]

    # Link to parent directory (except at root)
    lines.append("  <a href=\"../\">../</a><br>")

    # List subdirectories
    for d in sorted(subdirs):
        lines.append(f"  <a href=\"{d}/\">{d}/</a><br>")

    # List files
    for f in sorted(files):
        if f == "index.html":
            continue
        lines.append(f"  <a href=\"{f}\">{f}</a><br>")

    lines.append("</body>")
    lines.append("</html>")
    return "\n".join(lines)

def build_indexes(root_folder):
    root = Path(root_folder)

    for current_dir, subdirs, files in os.walk(root):
        current_path = Path(current_dir)
        html = generate_index_html(current_path.name or "/", subdirs, files)
        index_file = current_path / "index.html"
        index_file.write_text(html, encoding="utf-8")
        print(f"Written: {index_file}")

if __name__ == "__main__":
    # change this to your repo root or images root
    build_indexes(r"C:\Users\jaivigneshr\Contacts\Project")
