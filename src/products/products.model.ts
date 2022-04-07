export class Product {
    //adding public or private allows us to access the properties either outside + inside or just inside respectively
    //this also removes the need to add this.property = property boilerplate
    constructor(public id: string, public title: string, public description: string, public price: number) {
    }
}