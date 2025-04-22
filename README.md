# 🕷️ GitHub Topics Web Scraper

This Node.js project scrapes **GitHub Topics**, extracts the **top 8 repositories** for each topic, and then goes deeper to fetch **open issues** from each repository. It organizes the data neatly into folders for each topic and repository.

---

## 📦 Features

- 🔍 Scrapes all available **topics** from GitHub Topics page
- 📂 Visits each topic and gets the **top 8 repositories**
- 🧾 Extracts the **open issues** from each repository
- 🗂️ Saves issue data in a structured folder layout
- 📁 Automatically creates folders for each topic and its repositories

---

## 🔧 Tech Stack

| Technology | Description                          |
|------------|--------------------------------------|
| Node.js    | JavaScript runtime                   |
| Cheerio    | For HTML parsing (like jQuery)       |
| Request    | For making HTTP requests             |
| fs, path   | To create and manage files/folders   |

---

## 🧠 How It Works

1. **Start from `https://github.com/topics`**
2. **Extract links** to individual topic pages (like `machine-learning`, `nodejs`, etc.)
3. **Visit each topic page**, and get the **top 8 repositories**
4. For each repository:
   - Construct the **issues page link**
   - Visit the page
   - Extract open issues (using `extractIssues.js`)
5. Save the data in a folder structure like:


