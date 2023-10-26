export class Package{
    public id?: number;
    public postal!: number;
    public sender!: string;
    public address!: string;
    public recipient!: string;
    public weight!: number;
    public price!: number;
    public isEdit!: boolean;
    public transport?: string;
}

export class Type{
    public name!: string;
    public intmin!: number;
    public intmax!: number;
}

export class Code{
    public name!: string;
    public code!: number;
    public isEdit!: boolean;
}

export class Usuario{
    public id?: number;
    public nombre?: string;
    public email!: string;
    public pass!: string;
    public role?: string;
}

