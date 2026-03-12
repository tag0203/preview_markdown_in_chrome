# preview-markdown-in-chrome

ローカルの `.md` ファイルをVivaldi（またはChrome）でプレビューするChrome拡張機能。

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

`marked.min.js` が `extension/lib/` に自動コピーされます。

### 2. 拡張機能の読み込み

1. Vivaldiで `vivaldi://extensions` を開く（Chromeの場合は `chrome://extensions`）
2. 右上の「デベロッパーモード」をONにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このリポジトリの `extension/` フォルダを選択

### 3. ファイルURLへのアクセスを許可

1. 拡張機能一覧で「Markdown Preview」の「詳細」を開く
2. 「ファイルのURLへのアクセスを許可する」をONにする

### 4. 動作確認

任意の `.md` ファイルをVivaldiにドラッグ＆ドロップするか、`file://` URLで開くとMarkdownがHTMLとしてレンダリングされます。

---

## FinderからVivaldiで開く（macOS）

### Automatorでアプリを作成

1. Automatorを開き「新規書類」→「アプリケーション」を選択
2. 左のライブラリから「シェルスクリプトを実行」をダブルクリックして追加
3. 「入力の引き渡し方法」を「引数として」に変更
4. スクリプト欄に以下を入力:

```bash
for f in "$@"; do
  open -a "Vivaldi" "$f"
done
```

5. `Open in Vivaldi.app` などの名前で保存（例: `~/Applications/`）

### Finderのデフォルトアプリを設定

1. Finderで任意の `.md` ファイルを右クリック →「情報を見る」
2. 「このアプリケーションで開く」で `Open in Vivaldi.app` を選択
3. 「すべてを変更...」をクリックすると全 `.md` ファイルに適用される

---

## 仕組み

- `content.js` が `file://` プロトコルかつ `.md` 拡張子のページでのみ動作
- Chromeが生テキストファイルを `<pre>` タグで表示するのを検出して実行
- [marked](https://github.com/markedjs/marked) でMarkdownをHTMLに変換
- `style.css` でGitHubライクなスタイルを適用（ダークモード対応）

## 注意事項

- `http://` や `https://` のURLでは動作しません（`file://` 専用）
- `.html` などのMarkdown以外のファイルには影響しません
- Automatorで作成した `.app` はgit管理外にしてください
