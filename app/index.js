// Check Node.js version
const nodeVersion = process.versions.node;
if (parseInt(nodeVersion) < 20) {
    console.error('This application requires Node.js version 20 or higher');
    console.error('Current version:', nodeVersion);
    process.exit(1);
}

const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;
const dataFile = path.join(__dirname, 'data.json');

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Names API',
            version: '1.0.0',
            description: 'A simple API to store and retrieve names',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: [path.join(__dirname, 'index.js')], // Updated path to use __dirname
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse JSON bodies
app.use(express.json());

// Ensure data file exists
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ names: [] }));
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Name:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name to store
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /names:
 *   get:
 *     tags:
 *       - Names
 *     summary: Retrieve all names
 *     description: Returns an array of all stored names
 *     responses:
 *       200:
 *         description: A list of names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Server error while reading names
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/names', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        res.json(data.names);
    } catch (error) {
        res.status(500).json({ error: 'Error reading names' });
    }
});

/**
 * @swagger
 * /names:
 *   post:
 *     tags:
 *       - Names
 *     summary: Add a new name
 *     description: Adds a new name to the storage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Name'
 *     responses:
 *       201:
 *         description: Name added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Name is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error while adding name
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/names', (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        data.names.push(name);
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        
        res.status(201).json({ message: 'Name added successfully', name });
    } catch (error) {
        res.status(500).json({ error: 'Error adding name' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
}); 