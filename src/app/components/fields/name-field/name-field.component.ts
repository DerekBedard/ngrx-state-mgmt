import { BooleanInput } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss'],
})
export class NameFieldComponent implements OnInit {
  @Input() friendForm: any;
  @Input() placeholder: string = '';
  @Input() readonly: BooleanInput = false;
  @Input() controlName: string = '';

  constructor() {}

  ngOnInit(): void {}
}
