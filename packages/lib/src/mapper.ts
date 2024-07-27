import { Entity } from "./entity.base";

export interface Mapper<DomainEntity extends Entity<any>> {
  // toPersistence(entity: DomainEntity): DbRecord;
  toDomain(record: any): DomainEntity;
}
