export class Car {
    photo: string;
    constructor(
                 public modele: string, 
                 public marque: string, 
                 public kilometres: string, 
                 public annee: string, 
                 public carburant: string,
                 public prix: string,
                 public boite: string,
                 public description: string,
                 public photos: any[]) {}
}