import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  form = new FormGroup({
    firstAmount: new FormControl<any>(null),
    secondAmount: new FormControl<any>(null),
    firstSelect: new FormControl<any>('USD'),
    secondSelect: new FormControl<any>('UAH')
  })

  constructor(private converterService: ConverterService) { }

  ngOnInit(): any {
    this.changeFirstInput();
    this.changeSecondInput();
    this.changeFirstSelect();
    this.changeSecondSelect();
  }

  changeFirstInput() {
    this.form.get('firstAmount')?.valueChanges.subscribe(firstInputValue => {
      this.converterService.getExchangeRate(firstInputValue, this.form.value.secondSelect, this.form.value.firstSelect)
      .subscribe(response => this.form.value.secondAmount = Object.entries(response.rates)[0][1])
    })
  }

  changeSecondInput() {
    this.form.get('secondAmount')?.valueChanges.subscribe(secondInputValue => {
      this.converterService.getExchangeRate(secondInputValue, this.form.value.firstSelect, this.form.value.secondSelect)
      .subscribe(response => this.form.value.firstAmount = Object.entries(response.rates)[0][1])
    })
  }

  changeFirstSelect() {
    this.form.get('firstSelect')?.valueChanges.subscribe(firstSelectValue => {
      this.converterService.getExchangeRate(this.form.value.firstAmount, this.form.value.secondSelect, firstSelectValue)
      .subscribe(response => {
        this.form.value.secondAmount = Object.entries(response.rates)[0][1];
        console.log(response);
      })
    })
  }

  changeSecondSelect() {
    this.form.get('secondSelect')?.valueChanges.subscribe(secondSelectValue => {
      this.converterService.getExchangeRate(this.form.value.secondAmount, secondSelectValue, this.form.value.firstSelect)
      .subscribe(response => {
        this.form.value.firstAmount = Object.entries(response.rates)[0][1];
      })
    })
  }

}
