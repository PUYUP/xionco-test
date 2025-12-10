import type { NextFunction, Request, Response } from "express";
import { z } from 'zod'
import { prisma } from "../db/prisma";
import { Prisma } from "../db/generated/prisma/client";

export class ProductController {
    /**
     * Create product
     */
    async create(req: Request, res: Response, next: NextFunction) {
        const { body } = req;

        try {
            const result = await prisma.product.create({
                data: body,
            });

            return res.json(result);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                throw error;
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // P2002 is the error code for unique constraint violation
                    return res.status(409).json({
                        error: `Product already exists.`,
                        field: 'name',
                    });
                }
            }
            // Handle other errors or re-throw if not a Prisma error
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }

    /**
     * List product
     */
    async get(req: Request, res: Response) {
        const results = await prisma.product.findMany();
        return res.json(results);
    }

    /**
     * Update product
     */
    async update(req: Request, res: Response) {
        const id = req.params.id;
        const { body } = req;

        // check record available
        const instance = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        if (!instance) {
            res.status(404).json({
                'message': 'Product not found.',
            });
        }

        // all ok update product
        try {
            const result = await prisma.product.update({
                where: { id: parseInt(id) },
                data: body,
            });

            return res.json(result);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                throw error;
            }
        }
    }

    /**
     * Delete product
     */
    async remove(req: Request, res: Response) {
        const id = req.params.id;

        // check record available
        const instance = await await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            }
        });

        if (!instance) {
            res.status(404).json({
                'message': 'Product not found.',
            });
        }

        // all ok perform delete
        try {
            await prisma.product.delete({
                where: {
                    id: parseInt(id),
                },
            });

            res.status(204).json({ 
                message: 'Product delete success.',
            });
        } catch (error: any) {
            throw error;
        }
    }
}