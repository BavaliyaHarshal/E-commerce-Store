# E-Commerce Store (React + Vite)

A modern e-commerce web application built with React, Vite, and Bootstrap. Features include product browsing, cart management, order history, user authentication, and admin product management.

## Features

- **Product Listing:** Browse and filter products by category.
- **Product Details:** View detailed information for each product.
- **Cart:** Add, remove, and update product quantities in the cart.
- **Orders:** View previous orders and order details.
- **User Authentication:** Simple login and user registration.
- **Admin Actions:** Add, edit, and delete products (with soft delete and restore).
- **Responsive Design:** Works well on desktop and mobile devices.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [JSON Server](https://github.com/typicode/json-server) (for mock backend)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/BavaliyaHarshal/E-commerce-store
   cd store
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Install and start JSON Server (in a separate terminal):**

   ```sh
   cd ../json-server
   npm install
   npm start
   ```

   This will start the backend API at `http://localhost:3020`.

4. **Start the React development server:**

   ```sh
   cd ../store
   npm run dev
   ```

   The app will open at [http://localhost:3015](http://localhost:3015).

### Available Scripts

- `npm run dev` — Start the development server.
- `npm run build` — Build the app for production.
- `npm run preview` — Preview the production build.
- `npm run lint` — Run ESLint on the codebase.

## Project Structure

```plaintext
    store/
    public/
        images/           # Product images
    src/
        api/              # API utility functions
        components/       # Reusable UI components
        pages/            # Page components (routes)
        App.jsx           # Main app component
        main.jsx          # Entry point
    index.html
    package.json
    vite.config.js
    json-server/
    store-db.json       # Mock database
    package.json
```

## Customization

- **Product Images:** Place new images in `public/images/` and reference them in product data.
- **API Base URL:** Change the API endpoint in [`src/api/storeData.jsx`](src/api/storeData.jsx) if needed.

## Notes

- This project uses a mock backend (JSON Server). For production, replace with a real backend.
- Admin features (add/edit/delete products) are available after login.

## License

This project is for educational/demo purposes.
