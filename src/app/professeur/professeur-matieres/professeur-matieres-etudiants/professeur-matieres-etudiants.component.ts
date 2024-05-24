import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professeur-matieres-etudiants',
  standalone: true,
  imports: [],
  templateUrl: './professeur-matieres-etudiants.component.html',
  styleUrl: './professeur-matieres-etudiants.component.css',
})
export class ProfesseurMatieresEtudiantsComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);
    });
  }
}
