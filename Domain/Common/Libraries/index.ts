export type UUID = string;

export interface Uuid {
  generate(): UUID;
  validate( id: UUID ): boolean;
}
