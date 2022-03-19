export class Entity {
  protected _id: string;

  protected _createdAt: Date;

  protected _updatedAt: Date;

  constructor( uuid: string ) {
    this._id = uuid;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  set id( id: string ) {
    this._id = id;
  }

  set updatedAt( updatedAt: Date ) {
    this._updatedAt = updatedAt;
  }

}