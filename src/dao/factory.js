import { persistence } from "../config.js";

export let Product;
export let User;
export let Cart;
//export let Ticket;

switch (persistence) {
    case 'MONGO':
        console.log('Persistence: MONGO');
        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        Product = ProductMongo;
        const { default: UserMongo } = await import('./mongo/users.mongo.js')
        User = UserMongo;
        const { default: CartMongo } = await import('./mongo/carts.mongo.js')
        Cart = CartMongo;
        /*
        const { default: TicketMongo } = await import('./mongo/tickets.mongo.js');
        Ticket = TicketMongo;
		*/
        break;
    case 'FILE':
        console.log('Persistence: FILE');
        const { default: ProductFile } = await import('./file/products.file.js')
        Product = ProductFile;
		const { default: UserFile } = await import('./file/users.file.js')
        User = UserFile;
        const { default: CartFile } = await import('./file/carts.file.js');
		Cart = CartFile;
        /*
        const { default: TicketFile } = await import('./mongo/tickets.mongo.js');
        Ticket = TicketFile;
		*/
        break;
    default:
        console.log('Persistence: MEMORY');
        const { default: ProductMemory } = await import('./memory/products.memory.js')
        Product = ProductMemory;
		const { default: UserMemory } = await import('./memory/users.memory.js')
        User = UserMemory;
        const { default: CartMemory } = await import('./memory/carts.memory.js');
        Cart = CartMemory;
        /*
        const { default: TicketMemory } = await import('./mongo/tickets.mongo.js');
        Ticket = TicketMemory;
		*/
        break;
}   