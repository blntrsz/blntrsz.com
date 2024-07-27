export type AggregateID = string;

export interface BaseEntityProps {
  id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateID;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  protected _id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
  protected readonly props: EntityProps;

  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this._id = id;
    this.validateProps(props);
    const now = new Date();
    this.createdAt = createdAt || now;
    this.updatedAt = updatedAt || now;
    this.props = props;
    this.validate();
  }

  get id(): AggregateID {
    return this._id;
  }

  public abstract validate(): void;
  public abstract validateProps(props: EntityProps): void;
  public getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props,
    };

    return Object.freeze(propsCopy);
  }
}
