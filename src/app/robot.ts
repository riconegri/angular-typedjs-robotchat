export class Robot {

  constructor(
    public id: string,
    public messages?: any[],
    public buttons?: any[],
    public inputs?: any[],
    public responses?: any[]
  ) {}
}
