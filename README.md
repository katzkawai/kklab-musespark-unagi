# 浜名湖うなぎ紹介サイト

浜名湖うなぎの魅力を紹介する静的サイトです。GitHub Pages で公開します。

## 特徴

- 和風モダンデザイン（レスポンシブ対応）
- セクション: 物語 / こだわり / 味わい方 / 名店ガイド / お取り寄せ / アクセス
- 名店フィルタリング、スムーズスクロール、ハンバーガーメニュー
- ピュア HTML/CSS/JS（ビルド不要）

## プレビュー

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## デプロイ（GitHub Pages）

`main` ブランチへ push すると GitHub Actions が自動デプロイします。

1. GitHub でリポジトリを作成し `main` に push
2. **Settings → Pages → Source** を `GitHub Actions` に設定
3. 次回 push で `https://<user>.github.io/<repo>/` に公開されます

手動で Pages を有効化する場合: `Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / root`
