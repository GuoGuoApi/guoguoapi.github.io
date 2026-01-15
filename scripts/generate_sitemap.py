import json
import argparse
from pathlib import Path


def build_sitemap(base_url: str, posts_path: Path, output_path: Path):
    base_url = base_url.rstrip('/') + '/'

    static_pages = [
        'index.html',
        'about.html',
        'blog.html',
        'resources.html',
        'updates.html',
    ]

    urls = []
    # 首页
    urls.append(f"{base_url}")
    # 其他静态页
    for page in static_pages:
        urls.append(f"{base_url}{page}")

    # 文章详情页（依据 posts.json）
    if posts_path.exists():
        try:
            with posts_path.open('r', encoding='utf-8') as f:
                posts = json.load(f)
            for post in posts:
                file = post.get('file')
                if not file:
                    continue
                urls.append(f"{base_url}blog-detail.html?file={file}")
        except Exception as e:
            print(f"[warn] 读取 {posts_path} 失败: {e}")

    # 生成XML
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for u in urls:
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{u}</loc>')
        xml_lines.append('  </url>')

    xml_lines.append('</urlset>')

    output_path.write_text('\n'.join(xml_lines), encoding='utf-8')
    print(f"[ok] 站点地图已生成: {output_path}")


def main():
    parser = argparse.ArgumentParser(description='生成 sitemap.xml')
    parser.add_argument('--base', default='https://guoguoapi.github.io/my-personal-site', help='站点基础URL')
    parser.add_argument('--posts', default='assets/posts.json', help='文章列表JSON路径')
    parser.add_argument('--out', default='sitemap.xml', help='输出的sitemap.xml路径')
    args = parser.parse_args()

    cwd = Path('.')
    build_sitemap(args.base, cwd / args.posts, cwd / args.out)


if __name__ == '__main__':
    main()