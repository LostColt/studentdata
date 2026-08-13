# Gulliver Prep Performance Portal

An interactive web application dashboard visualizing student performance data from a Google Sheet, customized with the Gulliver Prep brand identity.

## Features

*   **Live Data Integration:** Dynamically fetches and parses data from a published Google Sheet CSV export.
*   **Advanced Filtering:** Filter by Term (Quarter/Semester), specific Assessment/Assignment, and multiple students simultaneously.
*   **Visual Analytics:** Features line charts for trajectory tracking, grouped bar charts for category performance, and radar charts for multi-student skill comparison using `recharts`.
*   **Group Summary Statistics:** Instantly calculates group averages, completion rates, and grade trends compared to previous terms.
*   **PDF Export:** Custom "Print PDF" generation using `html2canvas` and `jspdf` to bypass browser print restrictions, exporting a clean, formatted report.
*   **Branded Identity:** Tailored with Gulliver Prep's official color palette and typography preferences.

## Tech Stack

*   **Frontend:** React (Vite), TypeScript
*   **Styling:** Tailwind CSS (Custom configured brand colors)
*   **Charts:** Recharts
*   **Utilities:** PapaParse (CSV Parsing), html2canvas & jsPDF (Exporting), Lucide React (Icons)

## Local Development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Connecting Data

The application pulls from a published Google Sheet. To update the data source:
1. Open your Google Sheet.
2. Go to **File > Share > Publish to web**.
3. Choose the specific sheet or entire document, and select **CSV (Comma-separated values)** as the output format.
4. Copy the generated link and update the `DATA_URL` variable in `src/components/Dashboard.tsx`.
