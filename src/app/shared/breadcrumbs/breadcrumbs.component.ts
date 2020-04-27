import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {
  label = 'label';

  constructor(private router: Router, private title: Title) {

    this.getDataRoute().subscribe(data => {
      this.label = data.label;
      this.title.setTitle(data.label);
    })

  }

  getDataRoute() {

    return this.router.events.pipe(
      //Filtramos los ActivationEnd, lo que solo sean null en firtchil y con el map solo pillamos los data
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );

  }
}
