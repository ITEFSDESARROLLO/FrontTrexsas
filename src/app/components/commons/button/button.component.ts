import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() text: string | undefined;
  @Input() disabled: boolean | undefined;
  @Input() renderbutton = true;
  @Input() buttonClass: string | undefined;
  @Input() URLicon: string | undefined;
  @Input() idButton: string | undefined;

  // tslint:disable-next-line:ban-types
  showIcon: String;

  constructor() {
    this.showIcon = "";
  }

  ngOnInit() {
    if ( this.URLicon != null ){
      this.showIcon = "";
    } else{
      this.showIcon = "hidden";
    }
  }

}
