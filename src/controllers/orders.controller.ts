import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Orders} from '../models';
import {OrdersRepository} from '../repositories';


export class OrdersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository: OrdersRepository,
  ) { }

  @post('/orders')
  @response(200, {
    description: 'Orders model instance',
    content: {'application/json': {schema: getModelSchemaRef(Orders)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {
            title: 'NewOrders',
            exclude: ['id'],
          }),
        },
      },
    })
    orders: Omit<Orders, 'id'>,
  ): Promise<Orders> {
    return this.ordersRepository.create(orders);
  }

  @get('/orders/count')
  @response(200, {
    description: 'Orders model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Orders) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.count(where);
  }

  @get('/orders')
  @response(200, {
    description: 'Array of Orders model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Orders) filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.ordersRepository.find(filter);
  }

  @patch('/orders')
  @response(200, {
    description: 'Orders PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
    @param.where(Orders) where?: Where<Orders>,
  ): Promise<Count> {
    return this.ordersRepository.updateAll(orders, where);
  }

  @get('/orders/{id}')
  @response(200, {
    description: 'Orders model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Orders, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Orders, {exclude: 'where'}) filter?: FilterExcludingWhere<Orders>
  ): Promise<Orders> {
    return this.ordersRepository.findById(id, filter);
  }

  @patch('/orders/{id}')
  @response(204, {
    description: 'Orders PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Orders, {partial: true}),
        },
      },
    })
    orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.updateById(id, orders);
  }

  @put('/orders/{id}')
  @response(204, {
    description: 'Orders PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orders: Orders,
  ): Promise<void> {
    await this.ordersRepository.replaceById(id, orders);
  }

  @del('/orders/{id}')
  @response(204, {
    description: 'Orders DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ordersRepository.deleteById(id);
  }

  @get('/orders/user/{userId}')
  @response(200, {
    description: 'List of orders for a specific user',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Orders, {includeRelations: true}),
        },
      },
    },
  })
  async findOrdersByUserId(
    @param.path.string('userId') userId: string,
  ): Promise<Orders[]> {
    // Construct a Filter object explicitly
    const filter: Filter<Orders> = {
      where: {userId}, // This is equivalent to the Where clause
    };

    return this.ordersRepository.find(filter);
  }
}
