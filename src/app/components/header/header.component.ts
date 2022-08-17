import { Component, OnInit } from '@angular/core';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  usd = 0
  eur = 0

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    this.converterService.getCurrencyToUah('USD')
      .subscribe(response => this.usd = Object.entries(response.rates)[0][1])

    this.converterService.getCurrencyToUah('EUR')
      .subscribe(response => this.eur = Object.entries(response.rates)[0][1])
  }
}
