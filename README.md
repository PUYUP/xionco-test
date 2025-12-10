# How to run
## Backend
The backend use:
- Express JS
- Prisma as database ORM
- SQLite
- Zod for schema validation

Open terminal and navigate to backend folder:
- Run 'npm install' first
- Then 'npm run dev'

### REST APIs;

Payload:
{
    name: string;
    desc?: string;
}

- Create Product: [POST] http://localhost:3000/products
- Update Product: [PUT] http://localhost:3000/products/<id>
- Delete Product: [DELETE] http://localhost:3000/products/<id>
- List Product: [GET] http://localhost:3000/products

## Frontend
To do