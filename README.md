<div align="center">

  <h1>Gundam Getter ReadME</h1>
  
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
- [Roadmap](#roadmap)
- [Contact](#contact)

<!-- About the Project -->

## About the Project

### Overview

My friend at Gundam Planet maintains a Google Sheet with 3000+ entries for upcoming model kit release dates for their customers. Updating this list requires checking one of their many distributors' websites for the information. This was done manually, and updating the entire list required around 8 hours of manual data entry.

Gundam Getter reads the SKU data from Google Sheets, then the server launches a headless Firefox browser via Selenium to scrape model kit release dates from select websites, then writes that data back to a Google Sheet.

### View Demo

<div align="center"> 
<p>put the video link here</p>
</div>

<!-- TechStack -->

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li>Typescript</li>
    <li>React.js</li>
    <li>Next.js</li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li>Typescript</li>
    <li>Express.js</li>
    <li>Node.js</li>

  </ul>
</details>

<details>
<summary>Other</summary>
  <ul>
    <li>Selenium</li>
    <li>Google Sheets API</li>
  </ul>
</details>

<!-- Features -->

### Features

- Utilizes Google Sheets API to authorize and authenticate read and write requests to the Google Sheet.
- A headless Selenium Firefox browser to scrape web data.
- If the release date cannot be found on the page, a link to the page is written to the Google Sheet for manual verification.

<!-- Roadmap -->

## Roadmap

- [ ] Add Selenium sripts for additional websites
- [ ] Launch multiple Selenium instances to scrape multiple websites in parallel
- [ ] Enable writing to the sheet after each date is found instead of waiting for all dates
- [ ] Write the website URL to a new column for spot checking

## Contact

Eric Moran - emoran0403@gmail.com
