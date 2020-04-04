export class Usuario {

  constructor(

    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public google?: string,
    public roles: string[] = []


  ) { }



}
