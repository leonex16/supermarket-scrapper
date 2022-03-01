import { UUID } from "@Common/Gateways/UUID";

export class Entity {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;

  constructor(UUID: UUID) {
    this._id = UUID.generate();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

}