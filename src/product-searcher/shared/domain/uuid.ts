export interface UUIDV4 {
  generate(): string
  validate( uuid: string ): boolean
}
