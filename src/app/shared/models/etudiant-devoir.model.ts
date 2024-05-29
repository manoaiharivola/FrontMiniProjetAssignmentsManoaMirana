export class EtudiantDevoir {
    _id?: string;
    note: number | null = null;
    remarques_note: string = '';
    rendu: boolean = false;
    dateLivraison!: Date;
    dateNotation?: Date;
    devoir_id!: string;
    etudiant_id!: {
      _id: string;
      nom: string;
      prenom: string;
      mail: string;
    };
  }
  