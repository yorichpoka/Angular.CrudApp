import { Component, OnInit, Input } from '@angular/core';
import { LoadPanel } from 'src/app/helpers/loadpanel.helper';

@Component({
  selector: 'app-load-panel',
  templateUrl: './load-panel.component.html',
  styleUrls: ['./load-panel.component.css']
})
export class LoadPanelComponent implements OnInit {

  @Input() properties: LoadPanel = new LoadPanel();

  constructor() { }

  ngOnInit() {
  }

}
