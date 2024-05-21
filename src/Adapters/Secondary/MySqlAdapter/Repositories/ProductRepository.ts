import { Repository } from 'typeorm'
import { AppDataSource } from '../index'
import { Product as model } from '../models/Product'
import NotFoundException from '../../../../Application/domain/Exceptions/NotFoundException'
import IProductRepository from '../../../../Application/Ports/Secondary/IProductRepository'
import Product from '../../../../Application/domain/Entities/Product'
import { Either, Left, Right } from '../../../../Shared/util/either'

export default class ProductRepository implements IProductRepository {
    private repository: Repository<model>

    constructor() {
        this.repository = AppDataSource.getRepository(model)
    }

    async create(product: Product): Promise<Either<Error, string>> {
        try {
            const productJSON = product.toJSON()

            const productModel = new model()
            productModel.name = productJSON.name
            productModel.category = productJSON.category
            productModel.price = productJSON.price
            productModel.description = productJSON.description

            await this.repository.save(productModel)

            return Right<string>('Product has been created')
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async update(product: Product): Promise<Either<Error, string>> {
        try {
            const productToUpdate = await this.repository.findOneBy({
                id: product.getId(),
            })

            if (!productToUpdate) {
                return Left<Error>(
                    new NotFoundException('Product: ' + product.getId())
                )
            }

            const productJSON = product.toJSON()

            productToUpdate.name = productJSON.name
            productToUpdate.category = productJSON.category
            productToUpdate.price = productJSON.price
            productToUpdate.description = productJSON.description

            await this.repository.save(productToUpdate)

            return Right<string>('Product has been updated')
        } catch (error) {
            return Left<Error>(error as Error)
        }
    }

    async delete(id: string): Promise<Either<Error, string>> {
        const productToRemove = await this.repository.findOneBy({
            id,
        })

        if (!productToRemove) {
            return Left<Error>(new NotFoundException('Product: ' + id))
        }

        await this.repository.remove(productToRemove)

        return Right<string>('Product has been removed')
    }

    async findById(id: Product['id']): Promise<Either<Error, Product>> {
        const productFind = await this.repository.findOneBy({
            id,
        })

        if (!productFind) {
            return Left<Error>(new NotFoundException('Product: ' + id))
        }

        const product = new Product(
            productFind.id,
            productFind.name,
            productFind.category,
            productFind.price,
            productFind.description
        )

        return Right<Product>(product)
    }

    async findByCategory(
        category: Product['category']
    ): Promise<Either<Error, Product[]>> {
        const productsFind = await this.repository.findBy({
            category,
        })

        if (productsFind.length === 0) {
            return Right<Product[]>([])
        }

        const products = productsFind.map((product) => {
            return new Product(
                product.id,
                product.name,
                product.category,
                product.price,
                product.description
            )
        })
        return Right<Product[]>(products)
    }
}
