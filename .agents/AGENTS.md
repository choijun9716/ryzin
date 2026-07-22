# Workspace Custom Rules (AGENTS.md)

## UI & Design Rules
1. **NO EMOJIS (이모티콘 절대 금지)**:
   - Do NOT use emojis anywhere in the admin codebase, titles, tabs, badges, or toast messages.
   - All badges and UI elements must use text, SVG icons, or CSS badges.

2. **Admin UI/UX Standard**:
   - Follow the design system of `dashboard.js` and `live_stream.js`.
   - Use clean, minimal, slim form fields and cards with consistent padding and typography.
   - For shop management, use the 4 core sub-tabs:
     - `상품 관리`
     - `기획전 관리`
     - `탑배너 관리`
     - `퀵메뉴 관리`

3. **Product Master & Modal Workflow**:
   - Manage products in a table list view with unique `product_code` (e.g., `PROD-XXXXX`).
   - Create/edit products using a dedicated modal dialog (`sm-modal`).
   - Support code/name search modal for attaching products to exhibitions or lives.
