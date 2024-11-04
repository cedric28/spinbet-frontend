Spinbet Frontend
- This is a Next.js 13 application developed using TypeScript and Tailwind CSS for styling. The project incorporates several features including authentication, participation chart visualization, and participation data management. The application is structured to follow SOLID principles and leverages various libraries and frameworks to enhance functionality and maintainability.


Project Structure
- The project is organized as follows:

```
src
├── components
│   ├── AuthGuard.tsx
│   ├── InputField.tsx
│   ├── Navbar.tsx
│   ├── ParticipationChart.tsx
│   └── ParticipationTable.tsx
├── config
│   └── api.ts
├── hooks
├── pages
│   ├── api
│   │   └── auth
│   │       └── [...nextauth].ts
│   ├── dashboard
│   ├── login
│   │   └── index.tsx
│   ├── register
│   │   └── index.tsx
│   └── index.tsx
├── services
│   ├── authService.ts
│   ├── httpService.ts
│   └── participationService.ts
├── styles
│   └── globals.css
├── types
│   ├── next-auth.d.ts
├── utils
│   ├── color.ts
│   └── text.ts
└── ...
```

Key Directories and Files
- components: Contains reusable UI components, such as AuthGuard, InputField, and ParticipationChart.
- config: Contains configuration files, including api.ts for API configurations.
- pages: Holds Next.js pages, including authentication pages (login and register) and the dashboard.
- services: Contains service files, like authService.ts for handling authentication, httpService.ts for HTTP requests, and participationService.ts for managing participation-related logic.
- styles: Includes global CSS styles, with globals.css applying custom Tailwind CSS styles.
- utils: Contains utility files, such as color and text utility helpers.
- types: Contains TypeScript type definitions, including custom NextAuth types in next-auth.d.ts.

Tech Stack

Core
- ext.js 13: A React framework for building scalable web applications.
- TypeScript: Adds static typing to JavaScript, improving code readability and reducing errors.
- Tailwind CSS: A utility-first CSS framework for building custom designs directly in the markup.

Libraries and Dependencies
- @hookform/resolvers: Validation resolver for react-hook-form with support for schemas like Zod.
- axios: HTTP client for making API requests.
- chart.js & react-chartjs-2: Used for rendering charts in ParticipationChart.tsx.
- jsonwebtoken: For handling JSON Web Tokens (JWT) in authentication.
- next-auth: Authentication library for Next.js applications, supporting multiple providers.
- react-hook-form: Provides flexible and efficient form management.
- sweetalert2: Used for customizable popups and alerts.
- zod: For schema validation in forms.

DevDependencies
- ESLint: Linting tool for maintaining code quality.
- PostCSS: CSS processing tool with plugins.
- Tailwind CSS: Utility-first CSS framework.
- TypeScript: Superset of JavaScript for type safety.

Features
- Authentication: User authentication handled through next-auth and JWTs.
- Participation Management: View and manage participation data, with features like data visualization using Chart.js.
- Reusable Components: UI components like AuthGuard, InputField, and Navbar are modular and reusable.
- Responsive Design: Tailwind CSS ensures responsive and adaptive styling for a smooth user experience on all screen sizes.
- SOLID Principles: Code is structured to be clean, scalable, and maintainable.

Installation
- To get started with this project, clone the repository and install the dependencies:

```
git clone https://github.com/your-repo/spinbet-frontend.git
cd spinbet-frontend
npm install
```

Usage
- To run the application locally:

```
npm run dev
```
- The application will be available at http://localhost:3000.

Sample Credentials
- For testing purposes, use the following sample credentials:

- Email: angelyndoe@gmail.com
- Password: passw0rd

URL
- You can access the deployed application at: https://spinbet-frontend.vercel.app/

